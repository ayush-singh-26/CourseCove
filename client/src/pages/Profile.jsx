import React, { useEffect, useState } from "react";
import Course from "./student/Course";
import { useDeleteUserMutation, useLoadUserQuery } from "../Feature/api/authApi";

const Profile = () => {
  const [userData, setUserData] = useState(null);


  const { data: loadUserData, isLoading: loadUserIsLoading } = useLoadUserQuery();
  const [deleteUser, { data: deleteUserData, isLoading: deleteUserIsLoading }] = useDeleteUserMutation();


  useEffect(() => {
    if (loadUserData?.data) {
      setUserData(loadUserData?.data);
    }
  }, [loadUserData]);


  const [isEdit, setIsEdit] = useState(false);
  if (!userData) return <p>Loading...</p>;

  return (
    <div className="mx-10 flex flex-col gap-6 p-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <img
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-lg"
            src={userData.avatar}
            alt="Profile"
          />
          {isEdit && (
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              className="bg-gray-50 text-3xl font-bold w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              value={userData.fullname}
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">{userData.fullname}</h1>
          )}
          <p className="text-gray-500 mt-1">{userData.role}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2"></div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-blue-600 mt-1">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone}
                />
              ) : (
                <p className="text-blue-500 mt-1">{userData.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              {isEdit ? (
                <select
                  className="bg-gray-50 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="mt-1">{userData.gender || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {isEdit ? (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
            onClick={() => setIsEdit(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save Changes
          </button>
        ) : (
          <button
            className="bg-white text-blue-600 px-6 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2"
            onClick={() => setIsEdit(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </button>
        )}
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md flex items-center gap-2"
          onClick={() => deleteUser()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete Account
        </button>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Courses</h2>
        {userData.enrolledCourses.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-gray-500 mt-4">You haven't enrolled in any courses yet</p>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.enrolledCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
