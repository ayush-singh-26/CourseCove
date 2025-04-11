import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [searchQuery,setSearchQuery]=useState("")
    const navigate= useNavigate();
    

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/course/search?query=${searchQuery}`)
    }
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                    Find the perfect course for your <span className="text-yellow-300">growth</span>
                </h1>
                <p className="text-blue-100 dark:text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
                    Discover, learn and master new skills with our curated collection of courses
                </p>

                <div className="flex flex-col items-center space-y-6">
                    <form className="w-full max-w-2xl" onSubmit={handleSearch}>
                        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e)=>setSearchQuery(e.target.value)}
                                placeholder="Search for courses, skills, or instructors"
                                className="flex-grow border-none focus:ring-0 px-6 py-4 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 text-lg"
                            />
                            <button className="bg-blue-700 dark:bg-blue-800 text-white px-8 py-4 hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;