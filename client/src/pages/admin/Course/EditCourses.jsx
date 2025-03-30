import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "../../../Feature/api/courseApi";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Loading_spinner from "../../../components/Loader/Loading_spinner";

function EditCourses() {

    const { courseId } = useParams();
    const {data:courseByIdData,isLoading:courseByIdLoading,refetch}=useGetCourseByIdQuery(courseId);
    const [previewThumbnail,setPreviewThumbnail]=useState("");
    
    const { register, handleSubmit, formState: { errors } ,setValue} = useForm();
   
    useEffect(()=>{
      if(courseByIdData?.data){
          const course= courseByIdData?.data;
          
          setValue('courseTitle',course.courseTitle);
          setValue('courseDescription',course.courseDescription);
          setValue('category',course.category);
          setValue('courseLevel',course.courseLevel);
          setValue('price',course.coursePrice);
          setPreviewThumbnail(course.courseThumbnail);
      }
    },[courseByIdData,setValue])  
    


  const [editCourses, {
    data: courseData,
    error: courseError,
    isLoading: courseIsLoading,
    isSuccess: courseIsSuccess
  }] = useEditCourseMutation();

  // Handle thumbnail file selection and preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };


  const edit_Course = async (data) => {
    if (!data.courseTitle || !data.courseDescription || !data.category || !data.courseLevel || !data.price) {
      toast.error("All fields except thumbnail are required!");
      return;
    }

    const formData = new FormData();
    formData.append('courseTitle', data.courseTitle);
    formData.append('courseDescription', data.courseDescription);
    formData.append('category', data.category);
    formData.append('courseLevel', data.courseLevel);
    formData.append('price', Number(data.price));

    if (data.courseThumbnail && data.courseThumbnail.length > 0) {
      formData.append("courseThumbnail", data.courseThumbnail[0]);
    }

    try {
      await editCourses({ courseId, formData });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (courseError) {
      toast.error(courseError.message || 'Something went wrong');
    }
    if (courseIsSuccess) {
      toast.success('Course updated successfully');
    }
  }, [courseError, courseIsSuccess]);

  const [publishCourse]=usePublishCourseMutation();

  const publishStatusHandler=async(action)=>{
    try {
      const response = await publishCourse({courseId,query:action})
      if(response.data){
        toast.success(response.data.message);
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  }


  return (
    <div className="p-6">
      <Toaster />
      <div className="shadow-2xl rounded-lg p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Add detailed information regarding course</h1>
          <Link to="lecture" className="text-blue-500 hover:text-blue-700">Go to lecture pages</Link>
        </div>
        <form onSubmit={handleSubmit(edit_Course)}>
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold">Basic Information</h1>
                <p className="text-sm text-gray-600">Make changes to your courses here. Click save when you are done.</p>
              </div>
              <div className="flex">
                <button type="button" onClick={()=>publishStatusHandler(courseByIdData?.data?.isPublished ? "false":"true")} className="px-4 py-2 bg-white rounded text-black mx-2 shadow-md hover:bg-gray-100">
                  {courseByIdData?.data?.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button className="px-4 py-2 bg-black rounded text-white mx-2 shadow-md hover:bg-gray-800">Remove Course</button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                <input 
                  type="text" 
                  id="courseTitle" 
                  placeholder="Ex. FullStack Development" 
                  className="border rounded p-2 mt-1"
                  {...register("courseTitle", { required: "Title is required" })}
                />
                {errors.courseTitle && <p className="text-red-500">{errors.courseTitle.message}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="subtitle" className="text-sm font-medium text-gray-700">Subtitle</label>
                <input 
                  type="text" 
                  id="courseDescription" 
                  placeholder="Ex. Become a MERN Stack Developer from Zero to Hero in 2 Months" 
                  className="border rounded p-2 mt-1"
                  {...register("courseDescription", { required: "Description is required" })}
                />
                {errors.courseDescription && <p className="text-red-500">{errors.courseDescription.message}</p>}
              </div>

              <div className="flex space-x-4">
                <div className="flex flex-col flex-1">
                  <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    id="category" 
                    className="border rounded p-2 mt-1"
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="">Select</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Structure">Data Structure</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="AI">AI</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Game Development">Game Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Next.js">Next.js</option>
                    <option value="Node.js">Node.js</option>
                  </select>
                  {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>

                <div className="flex flex-col flex-1">
                  <label htmlFor="courseLevel" className="text-sm font-medium text-gray-700">Course Level</label>
                  <select 
                    id="courseLevel" 
                    className="border rounded p-2 mt-1"
                    {...register("courseLevel", { required: "Course Level is required" })}
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  {errors.courseLevel && <p className="text-red-500">{errors.courseLevel.message}</p>}
                </div>

                <div className="flex flex-col flex-1">
                  <label htmlFor="price" className="text-sm font-medium text-gray-700">Price (INR)</label>
                  <input 
                    type="text" 
                    id="price" 
                    className="border rounded p-2 mt-1"
                    {...register("price", { required: "Price is required", min: 0 })}
                  />
                  {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="thumbnail" className="text-sm font-medium text-gray-700">Course Thumbnail</label>
                <input 
                  type="file" 
                  id="thumbnail" 
                  className="border rounded p-2 mt-1"
                  {...register('courseThumbnail')}
                  onChange={handleThumbnailChange} 
                />
                {previewThumbnail && <img src={previewThumbnail} className="w-64 my-2" alt="Course Thumbnail" />}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button className="px-4 py-2 bg-gray-200 rounded text-black hover:bg-gray-300">Cancel</button>
                <button 
                  className="px-4 py-2 bg-black rounded text-white" 
                  disabled={courseIsLoading}
                >
                  {courseIsLoading ? <Loading_spinner /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourses;
