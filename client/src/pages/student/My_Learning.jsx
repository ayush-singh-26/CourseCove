import React, { useEffect, useState } from "react";
import { Skeleton_loader } from "../../components/Skeleton_loader";
import Course from "./Course";
import { useLoadUserQuery } from "../../Feature/api/authApi";
import { useNavigate } from "react-router-dom";
import { IoAlertCircleOutline } from "react-icons/io5";

function My_Learning() {
  const [userData, setUserData] = useState(null);
  const { data: loadUserData, isLoading } = useLoadUserQuery();

  useEffect(() => {
    if (loadUserData?.data) {
      setUserData(loadUserData?.data);
    }
  }, [loadUserData]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Learning</h1>

      <div className="mt-8">
        {
          isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  <Skeleton_loader className="h-72" />
                </div>
              ))
              }
            </div>
          ) : userData?.enrolledCourses?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <IoAlertCircleOutline className="text-4xl text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No courses enrolled</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                You haven't enrolled in any courses yet. Explore our catalog to find courses that match your interests.
              </p>
              <a
                href="/"
                onClick={scrollTo(50, 0)}
                className=" px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ori"
              >
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                userData?.enrolledCourses?.map((course, index) => (
                  <Course key={index} course={course} />
                ))
              }
            </div>
          )}
      </div>
    </div>
  );
}

export default My_Learning;