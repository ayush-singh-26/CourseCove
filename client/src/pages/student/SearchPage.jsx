import React, { useState } from 'react'
import Filter from './Filter'
import { useGetSearchCoursesQuery } from '../../Feature/api/courseApi'
import SearchResults from './SearchResults'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {

    const [searchQuery]=useSearchParams()
    const query=searchQuery.get("query");
    
    const [selectedCatagories,setSelectedCatagories]=useState([])
    const [sortByPrice,setSortByPrice]=useState("");

    const { data:getSearchCourseData } = useGetSearchCoursesQuery({
        searchQuery: query,
        catagories: selectedCatagories,
        sortByPrice
    })
    const courseData= getSearchCourseData?.data;    
    const isEmpty = false
    const isLoading = false
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="my-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results for "{query}"</h1>
                <p className="text-gray-600">
                    Showing results for {" "}
                    <span className="text-blue-600 font-semibold">{query}</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 flex-shrink-0">
                    <Filter />
                </div>

                <div className="flex-1">
                    {isLoading ? (
                        <div className="space-y-6">
                            {courseData.map((_, idx) => (
                                <CourseSkeleton key={idx} />
                            ))}
                        </div>
                    ) : isEmpty ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <CourseNotFound />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {courseData?.map((course, idx) => (
                                <SearchResults course={course} key={idx} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchPage

const CourseSkeleton = () => (
    <div className='flex items-center justify-center w-full h-16 bg-gray-200 rounded-md shadow-md'>
        <svg className='animate-spin w-6 h-6 text-gray-500' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='3' cy='3' r='3' stroke='currentColor' stroke-width='2' /></svg>
    </div>
)

const CourseNotFound = () => (
    <div className='text-center mt-6'>
        <h2>No courses found</h2>
        <p>Please try searching for a different topic</p>
    </div>
)
