import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate();


    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/course/search?query=${searchQuery}`)
    }
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Unlock Your Potential with <span className="text-blue-600">Online Learning</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Discover thousands of courses to advance your career, learn new skills, and achieve your goals.
                </p>

                <div className="max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search for courses, skills, or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 shadow-sm"
                        />
                        <button onClick={handleSearch} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Search
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default HeroSection;