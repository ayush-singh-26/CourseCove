import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
    const navigate = useNavigate();

    if (!course) {
        return <p className="text-center text-gray-500">Loading course...</p>;
    }

    return (
        <Link  
            to={`course-detail/${course._id}`}
            className="border border-gray-200 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white"
        >
            <img
                className="w-full h-44 object-cover bg-gray-100"
                src={course.courseThumbnail}
                alt={course.courseTitle}
            />
            <div className="p-4">
                <p className="text-gray-900 text-xl font-semibold">{course.courseTitle}</p>
                <p className="text-gray-900 text-xl font-semibold">{course.creator.fullname}</p>
                
                <div className="mt-2 flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium rounded-full">
                        {course.courseDescription}
                    </span>
                </div>

                <div className="mt-3 flex items-center">
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={assets.star} alt="star" className="w-5 h-5" />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 mx-2">4.5</span>
                </div>
            </div>
        </Link>
    );
};

export default Course;
