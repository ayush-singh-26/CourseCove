import React, { useEffect } from 'react'
import { useCreateCheckoutSessionMutation, useGetCourseDetailWithStatusQuery } from '../../Feature/api/purchaseApi';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import ReactPlayer from 'react-player'
import { CiCircleAlert } from "react-icons/ci";
import { MdOutlinePlayCircle } from 'react-icons/md';
import { FaLock } from "react-icons/fa";
const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate= useNavigate();
    const [createCheckoutSession, { data, isLoading, isError, isSuccess, error }] = useCreateCheckoutSessionMutation();

    const purchaseCourseHandler = async () => {
        await createCheckoutSession(courseId)
    }
    console.log(data);
    

    const { data: courseData, isLoading: courseIsLoading, isSuccess: courseIsSuccess, isError: courseIsError } = useGetCourseDetailWithStatusQuery(courseId);


    const course = courseData?.course;
    const purchasedCourse = courseData?.purchased || false;
    console.log(courseData);
    

    console.log(course, purchasedCourse);
   




    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.url) {
                window.location.href = data?.data?.url;
            } else {
                toast.error("Invalid response from server")
            }
        }
    }, [data, isError, isSuccess, error])

    if (isLoading) return <h1>Loading..</h1>
    if (courseIsError) return <h1>Error..</h1>

    return (

        <div className='mt-10 px-2'>
            <div className='bg-[#2D2F31] text-white p-6 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-semibold'>{course?.courseTitle || "Course Title"}</h1>
                <p className='text-lg text-gray-300'>{course?.subTitle || "Course sub Title"}</p>
                <p className='mt-2'>Created by <span className='font-medium'>{course?.creator?.fullname || "Instructor Name"}</span></p>
                <div className='flex items-center mt-3 text-sm text-gray-400'>
                    <CiCircleAlert className='mx-1' />
                    Last Updated {course?.updatedAt || "N/A"}
                </div> 
                <p className='mt-2 text-gray-300'>Students Enrolled: {course?.enrolledStudents.length || "0"}</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg'>
                    <h2 className='text-xl font-semibold'>Description</h2>
                    <p className='text-gray-600 text-sm mt-2'>{course?.courseDescription || "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, laboriosam!"}</p>

                    <div className='mt-6'>
                        <h2 className='text-lg font-semibold'>Course Content</h2>
                        <p className='text-sm text-gray-500'>{course?.lectures.length} lecture</p>
                        <div className='mt-3 space-y-3'>
                            {course?.lectures?.map((lecture, idx) => (
                                <div key={idx} className='flex justify-between items-center bg-gray-100 p-3 rounded-lg'>
                                    <span className='text-sm font-medium'>
                                        {
                                            courseData?.purchased ? <MdOutlinePlayCircle className='text-green-700' />
                                                : <FaLock className='text-gray-700' />
                                        }
                                    </span>
                                    <p className='text-sm font-medium'>{lecture.lectureTitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video & Purchase Section */}
                <div className='w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center'>
                    <div className='w-full h-64 bg-gray-200 rounded-lg overflow-hidden'>
                        <ReactPlayer
                            width='100%'
                            height='100%'
                            url={course?.lectures?.[0]?.videoUrl || ""}
                        />
                    </div>
                    <h2 className='text-xl font-semibold mt-4'>Lecture Title</h2>
                    <p className='text-lg font-medium text-gray-700 mt-2'>Price: {course?.coursePrice || "Free"}</p>

                    <div className='mt-4'>
                        {purchasedCourse ? (
                            <button className='px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700'>
                                Continue Course
                            </button>
                        ) : (
                            <button
                                className='px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400'
                                disabled={isLoading}
                                onClick={purchaseCourseHandler}
                            >
                                Enroll Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail;
