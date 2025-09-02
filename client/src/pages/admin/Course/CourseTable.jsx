import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useGetAllCoursesQuery } from "../../../Feature/api/courseApi";

function CourseTable() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const {
        data: getAllCourseData,
        error: getAllCourseError,
        isLoading: getAllCourseIsLoading,
        isSuccess: getAllCourseIsSuccess
    } = useGetAllCoursesQuery();

    useEffect(() => {
        if (getAllCourseData) {
            setCourses(getAllCourseData?.data);
        }
    }, [getAllCourseData]);

    const handleEditClick = (id) => {
        navigate(`${id}`);
    };

    return (
        <div className="p-5">
            <div className="mb-5">
                <button onClick={() => navigate('create')} className="p-2 bg-black text-white rounded w-52">
                    Create a new Course
                </button>
            </div>

            {getAllCourseIsLoading && (
                <div>Loading courses...</div>
            )}

            {getAllCourseError && (
                <div>Error loading courses: {getAllCourseError.message}</div>
            )}

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="w-2/7 border border-gray-300 px-4 py-2">Course Title</th>
                        <th className="w-1/7 border border-gray-300 px-4 py-2">Price</th>
                        <th className="w-1/7 border border-gray-300 px-4 py-2">Status</th>
                        <th className="w-2/7 border border-gray-300 px-4 py-2">Creator</th>
                        <th className="w-1/7 border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((item, index) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{item.courseTitle}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.coursePrice ? `$${item.coursePrice}` : "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.isPublished ? "Published" : "Not Published"}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.creator?.fullname} ({item.creator?.role})</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button onClick={() => handleEditClick(item._id)} className="text-blue-500">
                                    <FiEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseTable;
