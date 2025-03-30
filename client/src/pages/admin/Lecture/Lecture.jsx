import React, { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDeleteLectureMutation } from '../../../Feature/api/lectureApi';
import toast from 'react-hot-toast';

const Lecture = ({ lecture, courseId, index ,refetch}) => {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`${lecture._id}`);
    };

    const [deleteLecture, { isSuccess, isError, isLoading }] = useDeleteLectureMutation();

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Lecture has been successfully deleted");
        }
    }, [isSuccess, refetch]);
    return (
        <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
            <h1 className="font-bold text-gray-800">
                Lecture - {index + 1}: {lecture.lectureTitle}
            </h1>
            <div className="space-x-2">
                <button
                    aria-label="Edit Lecture"
                    onClick={handleUpdateClick}
                    className="text-blue-500"
                >
                    <FiEdit />
                </button>
                <button
                    onClick={() => deleteLecture(lecture._id)}
                    className={`text-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    <MdDelete />
                </button>

            </div>
        </div>
    );
};

export default Lecture;
