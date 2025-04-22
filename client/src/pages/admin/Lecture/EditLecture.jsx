import React, { useEffect, useState } from 'react';
import Switch from '../../../components/ui/Switch';
import axios from 'axios';
import toast from 'react-hot-toast';
import Progress_bar from '../../../components/ui/Progress_bar';
import { useDeleteLectureMutation, useEditLectureMutation, useGetLectureByIdQuery } from '../../../Feature/api/lectureApi';
import { useNavigate, useParams } from 'react-router-dom';

const EditLecture = () => {
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState({ videoUrl: "", publicId: "" });
    const [isPreviewFree, setIsPreviewFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const { courseId, lectureId } = useParams();

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setMediaProgress(true);

            try {
                const res = await axios.post('https://coursecove-fgew.onrender.com/api/v1/media/upload-video', formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    }
                });
                if (res.data.success) {
                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
                    toast.success(res.data.message);
                }
            } catch (err) {
                console.error(err);
                toast.error("Video upload failed.");
            }
        }
    };

    const [deleteLecture, { isLoading: deleteLectureLoading, isError: deleteLectureError, isSuccess: deleteLectureSuccess }] = useDeleteLectureMutation();
    const [editLecture, { isLoading, isError, isSuccess }] = useEditLectureMutation();
    const { data: lectureData, isLoading: lectureIsLoading, isError: lectureIsError, isSuccess: lectureIsSuccess } = useGetLectureByIdQuery(lectureId);

    useEffect(() => {
        if (lectureIsSuccess) {
            setLectureTitle(lectureData.data.lectureTitle || "");
            setUploadVideoInfo(lectureData.data.videoInfo || { videoUrl: "", publicId: "" });
            setIsPreviewFree(lectureData.data.isPreviewFree || false);
        }
    }, [lectureIsSuccess]);

    const editLectureHandler = async (e) => {
        e.preventDefault();
        if (!lectureTitle || !uploadVideoInfo?.videoUrl) {
            toast.error("Please fill all fields and upload video.");
            return;
        }
        const payload = {
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree,
            courseId,
            lectureId
        };

        await editLecture(payload);
    };

    useEffect(() => {
        if (deleteLectureSuccess) {
            toast.success("Lecture deleted!");
            navigate(`/admin/course/${courseId}/lecture`);
        }
        if (deleteLectureError) {
            toast.error("Failed to delete lecture!");
        }
    }, [deleteLectureSuccess, deleteLectureError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Lecture updated successfully!");
            navigate(`/admin/course/${courseId}/lecture`);
        }
        if (isError) {
            toast.error("Failed to update lecture!");
        }
    }, [isSuccess, isError]);

    return (
        <div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Edit Lecture</h1>
                    <p className="text-sm text-gray-600">Update the details of your lecture here. Click 'Update Lecture' when you're done.</p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => deleteLecture(lectureId)}
                        disabled={deleteLectureLoading}
                        className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-700"
                    >
                        {deleteLectureLoading ? 'Deleting...' : 'Remove Lecture'}
                    </button>
                </div>

                <form onSubmit={editLectureHandler}>
                    <div className="mb-4">
                        <label htmlFor="lectureTitle" className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="lectureTitle"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            placeholder="Ex. Introduction to Web Development"
                            className="border rounded p-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="videoUpload" className="text-sm font-medium text-gray-700">Upload Video</label>
                        <input
                            type="file"
                            id="videoUpload"
                            onChange={fileChangeHandler}
                            className="border rounded p-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <Switch
                            checked={isPreviewFree}
                            onChange={() => setIsPreviewFree(!isPreviewFree)}
                            label="Is this video FREE?"
                        />
                    </div>

                    {mediaProgress && (
                        <div className="my-4">
                            <Progress_bar value={`${uploadProgress}%`} />
                        </div>
                    )}

                    <div className="flex justify-start">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-black text-white rounded-md shadow-md "
                        >
                            {isLoading ? 'Updating...' : 'Update Lecture'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLecture;
