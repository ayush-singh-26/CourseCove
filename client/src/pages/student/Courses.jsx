import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Skeleton_loader } from "../../components/Skeleton_loader";
import { useSelector } from "react-redux";
import { useGetPublishedCourseQuery } from "../../Feature/api/courseApi";

const Courses = () => {

  const [course,setCourse]= useState([])
  const {data,isLoading,isError,isSuccess}=useGetPublishedCourseQuery();


  useEffect(()=>{
    setCourse(data?.data)
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton_loader key={index} />
            ))}
          </div>
        ) : course?.length === 0 ? (
          <h1 className="text-center text-xl font-semibold text-gray-600">You haven't enrolled yet</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {course?.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
