import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAddLectureMutation, useGetCourseLecturesQuery } from '../../../Feature/api/lectureApi';
import { useNavigate, useParams } from 'react-router-dom';
import Lecture from './Lecture';
import { toast } from "react-toastify";
import Loading_spinner from '../../../components/Loader/Loading_spinner';

const AddLecture = () => {
    const navigate= useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { courseId } = useParams();
    console.log(courseId);

    const [addLecture, {
        data, isLoading, isSuccess,
    }] = useAddLectureMutation();

    const { data: getCourseLecturesData, isLoading: getCourseLecturesIsLoading ,isError:getcourseLectureIsError,refetch} = useGetCourseLecturesQuery(courseId);


    const addLectureHandler = async (inputData) => {
        await addLecture({ inputData, courseId })
    }

    useEffect(()=>{
        if(isSuccess){
            refetch()
            toast.success(data.message)
        }
    },[isSuccess,getCourseLecturesData])
    return (

        <div>
            <form action="" onSubmit={handleSubmit(addLectureHandler)}>
                <div>
                    <h1 className='text-2xl font-bold my-3'>Let's add lectures, add some basic details for your new lecture</h1>
                    <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, possimus.</p>
                </div>
                <div className='flex flex-col my-2 space-y-2'>
                    <label htmlFor="" className="font-bold text-xl">Title</label>
                    <input type="text" placeholder='Your lecture title name'
                        className="w-1/2 p-2 border border-gray-700 rounded-md"
                        {...register('lectureTitle', { required: 'Please enter the lecture name' })} />
                    {errors.lectureTitle && <p>{errors.lectureTitle.message}</p>}
                </div>
                <div className='flex space-x-2 py-2'>
                    <button onClick={()=>navigate('/admin/course')} className="bg-white px-4 py-2 border border-gray-200 shadow-lg text-black font-semibold rounded-lg">Back to course</button>
                    <button className="bg-black px-4 py-2 border border-gray-200 shadow-lg text-white rounded-lg">
                        {isLoading? <Loading_spinner/> : "Create Lecture"}
                    </button>
                </div>
            </form>
            <div>
                {
                    getCourseLecturesIsLoading ? (
                        <p>Loading Lectures</p>
                    ): getcourseLectureIsError ? (
                        <p>Failed to fetch lectures</p>
                    ): getCourseLecturesData.data.lectures.length== 0 ?(
                        <p>No lectures found for this course.</p>
                    ) :
                    getCourseLecturesData.data.lectures.map((lecture,index)=>(
                        <Lecture key={lecture._id}
                        lecture={lecture}
                        courseId={courseId}
                        index={index}
                        refetch={refetch} />
                    ))
                }
            </div>
        </div>

    )
}

export default AddLecture
