import { useForm } from "react-hook-form";
import Loading_spinner from "../../../components/Loader/Loading_spinner";
import { useNavigate } from 'react-router-dom'
import { useAddCourseMutation } from "../../../Feature/api/courseApi";

function AddCourses() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [addCourses, {
        data: addCourseData,
        error: addCourseError,
        isLoading: addCourseIsLoading,
        isSuccess: addCourseIsSuccess
    }] = useAddCourseMutation();

    const Add_Course = async (data) => {
        await addCourses(data);
        navigate('/admin/course')
    }

    return (
        <div>
            <h1 className="text-2xl font-bold my-3">Lets add course,add some basic course details for your new course</h1>
            <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequatur dolorem saepe recusandae exercitationem doloribus illo natus eveniet neque laborum.</p>
            <form action="" className="flex flex-col space-y-2" onSubmit={handleSubmit(Add_Course)}>
                <label htmlFor="" className="font-bold  text-xl">Title:</label>
                <input type="text" placeholder="Your Course Name"
                    className="w-1/2 p-2 border border-gray-700 rounded-md"
                    {
                    ...register("courseTitle", { required: "Title is Required", minLength: 5, maxLength: 100 })
                    }
                />
                {errors.courseTitle && <p className="text-red-500">{errors.courseTitle.message}</p>}

                <label htmlFor="" className="font-bold  text-xl">Catagory:</label>
                <select name="" id="" className="w-1/2 p-2 border border-gray-700 rounded-md"
                    {
                    ...register("category", { required: "Category is Required" })
                    }>
                    <option value="">Select</option>
                    <option value="Next js">Next JS</option>
                    <option value="React js">React JS</option>
                    <option value="BlockChain">BlockChain</option>
                    <option value="Web development">Web development</option>
                    <option value="Data Structure">Data Structure</option>
                    <option value="Programming Language">Programming Language</option>
                </select>
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                <div className="space-x-3 space-y-2">
                    <button type="button" className="bg-white p-2 text-black font-semibold w-20 rounded-lg">Back</button>
                    <button type="submit" className="bg-black p-2 text-white w-20 rounded-lg">
                        {addCourseIsLoading ? <Loading_spinner /> : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCourses;