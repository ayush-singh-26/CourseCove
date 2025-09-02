import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "../../Feature/api/purchaseApi";

const Course = ({ course }) => {
  
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(course._id);  
  const courseLink = data?.purchased ? `/course-progress/${course._id}` : `/course-detail/${course._id}`;
  console.log(data);



  return (
    <Link
      to={courseLink}
      className="group border border-gray-200 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white"
    >
      <img
        className="w-full h-48 object-cover bg-gray-100"
        src={course?.courseThumbnail}
        alt={course?.courseTitle}
      />
      <div className="p-4 space-y-2">
        <p className="text-gray-900 text-lg font-semibold line-clamp-1">
          {course.courseTitle}
        </p>
        <p className="text-gray-600 text-sm font-medium line-clamp-1">
          By {data?.course?.creator?.fullname}
        </p>

        <p className= "text-sm line-clamp-2">
          {course.courseDescription}
        </p>

        <div className="flex items-center pt-2">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star} alt="star" className="w-4 h-4" />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700 ml-2">4.5</span>
        </div>
      </div>
    </Link>

  );
};

export default Course;
