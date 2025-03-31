import React, { useEffect, useState } from "react";
import Course from "./student/Course";
import { useDeleteUserMutation, useLoadUserQuery } from "../Feature/api/authApi";

const Profile = () => {
  const [userData, setUserData] = useState(null);


  const { data:loadUserData, isLoading:loadUserIsLoading } = useLoadUserQuery();
  const [deleteUser,{data:deleteUserData, isLoading:deleteUserIsLoading}] = useDeleteUserMutation();
  
  
  useEffect(() => {
    if (loadUserData?.data) {
      setUserData(loadUserData?.data);
    }
  }, [loadUserData]);
  

  const [isEdit, setIsEdit] = useState(false);
  if (!userData) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col gap-4 text-sm pt-5">
      <img className="w-36 h-36 rounded-full object-cover" src={userData.avatar} alt="Profile" />
      {isEdit ? (
        <input
          className="bg-gray-100 text-3xl font-medium w-full mt-4 leading-tight px-2 py-1 border rounded"
          type="text"
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          value={userData.fullname}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.fullname}</p>
      )}

      <hr />

      <div>
        <p className="text-neutral-500 underline mt-3">Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 px-2 py-1 border rounded"
              type="text"
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Role:</p>
          <p>{userData.role}</p>
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 px-2 py-1 border rounded"
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>
      </div>

      <div>
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div>
      <button
            className="border border-primary bg-red-600 text-white px-8 py-2 rounded-full hover:bg-red-800 hover:text-white transition-all"
            onClick={()=>deleteUser()}
          >
            Delete Account
          </button>
      </div>
      <div>
        <h1 className="font-medium text-lg" >Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {
            userData.enrolledCourses.length==0 ?(
              <h1>You haven't enrolled yet</h1>
            ):(
              userData.enrolledCourses.map((course) => (
                <Course key={course._id} course={course} />
              ))
            )
          }
        </div>

      </div>
    </div>
  );
};

export default Profile;
