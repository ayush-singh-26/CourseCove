import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Skeleton_loader } from "../../components/Skeleton_loader";
import { useSelector } from "react-redux";
import { useGetPublishedCourseQuery } from "../../Feature/api/courseApi";

const Courses = () => {

  const [course, setCourse] = useState([])
  const { data, isLoading, isError, isSuccess } = useGetPublishedCourseQuery();


  useEffect(() => {
    setCourse(data?.data)
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6" id="courses">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton_loader key={index} />
            ))}
          </div>
        ) : course?.length === 0 ? (
          <div className="text-center py-12">
            <h1 className="text-xl font-semibold text-gray-600 mb-4">No courses found</h1>
            <p className="text-gray-500">Try adjusting your search or browse our categories</p>
          </div>
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
