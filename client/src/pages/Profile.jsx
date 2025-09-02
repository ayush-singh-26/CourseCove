import React, { useEffect, useState, useRef } from "react";
import Course from "./student/Course";
import {
  useDeleteUserMutation,
  useLoadUserQuery,
  useUpdateAvatarMutation,
  useUpdateUserMutation
} from "../Feature/api/authApi";
import WarningModal from "../components/ui/WarningModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { data: loadUserData, isLoading: loadUserIsLoading, refetch } = useLoadUserQuery();
  const [deleteUser, { isSuccess: deleteUserIsSuccess, isLoading: deleteUserIsLoading }] = useDeleteUserMutation();
  const [updateUser, { isSuccess: updateUserIsSuccess, isLoading: updateUserIsLoading }] = useUpdateUserMutation();
  const [updateAvatar, { isLoading: avatarLoading }] = useUpdateAvatarMutation();

  useEffect(() => {
    if (loadUserData?.data) {
      setUserData(loadUserData?.data);
    }
  }, [loadUserData]);

  useEffect(() => {
    if (deleteUserIsSuccess) {
      toast.success("Account deleted successfully");
      navigate("/");
    }
  }, [deleteUserIsSuccess, navigate]);

  useEffect(() => {
    if (updateUserIsSuccess) {
      toast.success("Profile updated successfully");
      setIsEdit(false);
      refetch(); // Refetch user data to ensure consistency
    }
  }, [updateUserIsSuccess, refetch]);

  if (loadUserIsLoading) return <div className="flex justify-center items-center h-64"><p>Loading...</p></div>;
  if (!userData) return <div className="flex justify-center items-center h-64"><p>User not found</p></div>;

  const handleSave = () => {
    updateUser(userData);
  };

  const handleAvatarClick = () => {
    if (isEdit) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', file);
      console.log(formData);
      
      const res = await updateAvatar(formData).unwrap();
      setUserData((prev) => ({ ...prev, avatar: res.data.avatar }));
      toast.success(res.message || "Avatar updated successfully");
      refetch(); // Refetch user data to ensure consistency
    } catch (err) {
      toast.error(err.data?.message || "Failed to update avatar");
    }
  };

  return (
    <div className="mx-4 sm:mx-10 flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div 
            className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg ${isEdit ? 'cursor-pointer' : ''}`}
            onClick={handleAvatarClick}
          >
            <img
              className="w-full h-full object-cover"
              src={userData.avatar || "/default-avatar.png"}
              alt="Profile"
              onError={(e) => {
                e.target.src = '/default-avatar.png';
              }}
            />
            {isEdit && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
            {avatarLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              className="bg-gray-50 text-2xl sm:text-3xl font-bold w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, fullname: e.target.value }))}
              value={userData.fullname || ""}
            />
          ) : (
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{userData.fullname}</h1>
          )}
          <p className="text-gray-500 mt-1 capitalize">{userData.role}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <p className="text-blue-600 mt-1 break-all">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone || ""}
                  placeholder="Add phone number"
                />
              ) : (
                <p className="mt-1">{userData.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

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
                  value={userData.gender || ""}
                >
                  <option value="">Select</option>
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
          <>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2 disabled:opacity-50"
              onClick={handleSave}
              disabled={updateUserIsLoading}
            >
              {updateUserIsLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors shadow-sm flex items-center gap-2"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>
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
        <WarningModal 
          onConfirm={() => deleteUser()} 
          loading={deleteUserIsLoading} 
          text={'Delete Account'} 
          title="Confirm Account Deletion"
          message="Are you sure you want to delete your account? This action cannot be undone."
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Courses</h2>
        {!userData.enrolledCourses || userData.enrolledCourses.length === 0 ? (
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