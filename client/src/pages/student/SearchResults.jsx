import React from 'react'
import { Link } from 'react-router-dom'

const SearchResults = ({ course }) => {
  return (
    <div className="bg-white
     rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 mb-4 overflow-hidden">
      <Link to={`/course-detail/${course._id}`} className="flex">
        {/* Course Thumbnail */}
        <div className="md:w-1/4 h-48 bg-gradient-to-r from-blue-50 to-indigo-100">
          <img 
            src={course?.courseThumbnail || "https://via.placeholder.com/400x225"} 
            alt={course?.title || "Course thumbnail"} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:w-3/4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {course?.courseTitle || "Course Title"}
              </h2>
              <p className="text-gray-600 mb-2">
                {course?.courseDescription || "Course subtitle that describes what this course is about"}
              </p>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 overflow-hidden">
                  <img 
                    src={course?.creator.avatar || "https://via.placeholder.com/50"} 
                    alt={course?.creator.fullname || "Instructor"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-700">
                  {course?.creator.fullname || "Instructor Name"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                {course?.courseLevel || "Beginner"}
              </span>
              <div className="flex items-center mb-2">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">${course?.coursePrice || "49.99"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchResults