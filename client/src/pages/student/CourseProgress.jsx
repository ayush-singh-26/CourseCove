import React, { useState, useEffect } from 'react';
import {
  useGetCourseProgressQuery,
  useMarkAsCompletedMutation,
  useUpdateLectureProgressMutation
} from '../../Feature/api/courseProgressApi';
import { useParams } from 'react-router-dom';
import Loading_spinner from '../../components/Loader/Loading_spinner'
import {
  FiCheck,
  FiPlay,
  FiList,
  FiClock,
  FiDownload,
  FiCode
} from 'react-icons/fi';
import Loader from '../../components/Loader/Loader';

const CourseProgress = () => {
  const { courseId } = useParams();
  const {
    data: courseProgressData,
    isLoading: isCourseLoading,
    isError: isCourseError,
    error: courseError,
    refetch
  } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress, { isLoading: isUpdatingProgress }] = useUpdateLectureProgressMutation();
  const [markCompleted, {
    isLoading: isMarkingCompleted,
    isError: isMarkCompletedError,
    error: markCompletedError,
    isSuccess: markAsCompletedSuccess
  }] = useMarkAsCompletedMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  console.log(currentLecture);
  

  useEffect(() => {
    if (courseProgressData?.data?.courseDetails?.lectures?.length && !currentLecture) {
      setCurrentLecture(courseProgressData.data.courseDetails.lectures[0]);
    }
  }, [courseProgressData, currentLecture]);

  const courseData = courseProgressData?.data?.courseDetails;  
  
  const isCompleted = courseProgressData?.data?.completed;  

  const completedLecturesCount = courseProgressData?.data?.progress?.filter(lecture => lecture.viewed).length;
  const totalLectures = courseData?.lectures?.length;
  console.log(completedLecturesCount,totalLectures);
  
  const progressPercentage = Math.round((completedLecturesCount / totalLectures) * 100);

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId });
      refetch();
    } catch (error) {
      console.error('Error updating lecture progress:', error);
    }
  };

  
  const isLectureCompleted = (lectureId) => {
    return courseProgressData?.data?.progress?.some(
      lecture => lecture.lectureId === lectureId && lecture.viewed
    );
  };
  

  const handleLectureSelect = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleMarkAsCompleted = async () => {
    try {
      await markCompleted({ courseId });
      refetch();
    } catch (error) {
      console.error('Error marking course as completed:', error);
    }
  };

  if (isCourseLoading) return <Loader className="flex items-center"/>;
  if (isCourseError) return <p>Failed to fetch course data</p>;

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div className='flex-1'>
          <span className='inline-block px-3 py-1 text-sm font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-2'>
            {courseData?.category}
          </span>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
            {courseData?.courseTitle}
          </h1>
          <p className='mt-2 text-gray-600 max-w-3xl'>
            {courseData?.courseDescription}
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center'>
            <div className='relative w-12 h-12'>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage} 100`}
                />
              </svg>
              <span className='absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-700'>
                {isNaN(progressPercentage) ? 0 : progressPercentage}%
              </span>
            </div>
            <span className='ml-2 text-sm font-medium text-gray-500'>Complete</span>
          </div>
          <button
            onClick={handleMarkAsCompleted}
            className={`px-4 py-2 ${isCompleted
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isCompleted ? "Completed" : "Mark Complete"}
          </button>

        </div>
      </div>


      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-1 lg:w-2/3'>
          <div className='relative bg-black rounded-xl overflow-hidden shadow-xl'>
            {currentLecture ? (
              <video
                src={currentLecture?.videoUrl}
                controls
                className="w-full aspect-video"
                poster={courseData?.courseThumbnail}
                onPlay={() => handleLectureProgress(currentLecture._id)}
              />
            ) : (
              <div className="w-full aspect-video bg-gray-800 flex items-center justify-center text-white">
                Select a lecture to begin
              </div>
            )}
          </div>

          <div className='mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <h4 className='font-semibold text-lg mb-3'>About this lecture</h4>
            <p className='text-gray-700'>
              {currentLecture?.description || 'Select a lecture to view its details'}
            </p>
          </div>
        </div>

        {/* Lecture list sidebar */}
        <div className='lg:w-1/3'>
          <div className='sticky top-8'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='p-4 border-b border-gray-200 bg-gray-50'>
                <h2 className='font-bold text-xl text-gray-900 flex items-center'>
                  <FiList className='mr-2' />
                  Course Content
                </h2>
                <div className='flex justify-between items-center mt-2 text-sm'>
                  <span className='text-gray-600'>
                    {completedLecturesCount} of {totalLectures} lectures completed
                  </span>
                  <span className='font-medium text-indigo-600'>
                    {isNaN(progressPercentage) ? 0 : progressPercentage}%
                  </span>
                </div>
              </div>

              <div className='divide-y divide-gray-200 max-h-[600px] overflow-y-auto'>
                {courseData?.lectures?.map((lecture, index) => (
                  <div
                    key={lecture._id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${currentLecture?._id === lecture._id ? 'bg-indigo-50' : ''
                      }`}
                    onClick={() => handleLectureSelect(lecture)}
                  >
                    <div className='flex items-start'>
                      <div className={`flex-shrink-0 mt-1 mr-3 flex items-center justify-center w-6 h-6 rounded-full ${isLectureCompleted(lecture._id)
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-400'
                        }`}>
                        {isLectureCompleted(lecture._id) ? (
                          <FiCheck className='text-sm' />
                        ) : (
                          <FiPlay className='text-xs' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <h3 className={`font-medium ${currentLecture?._id === lecture._id
                            ? 'text-indigo-700'
                            : 'text-gray-900'
                          }`}>
                          {index + 1}. {lecture.lectureTitle}
                        </h3>
                        <div className='flex items-center mt-1 text-sm text-gray-500'>
                          <span className='flex items-center mr-3'>
                            <FiClock className='mr-1' />
                            {lecture.duration || '00:00'}
                          </span>
                          {isLectureCompleted(lecture._id) && (
                            <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor section */}
            <div className='mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
              <h3 className='font-bold text-lg mb-4'>About the Instructor</h3>
              <div className='flex items-center'>
                <img
                  src={courseData?.creator?.avatar || '/default-avatar.jpg'}
                  alt={courseData?.creator?.fullname}
                  className='w-12 h-12 rounded-full object-cover mr-4'
                />
                <div>
                  <h4 className='font-medium text-gray-900'>{courseData?.creator?.fullname || 'Instructor'}</h4>
                  <p className='text-sm text-gray-600 mt-1'>{courseData?.creator?.bio || 'Experienced instructor'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;