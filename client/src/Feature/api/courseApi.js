import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes:["Refetch-creator-course","Refetch-lecture"],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/courses/',
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        addCourse: builder.mutation({
            query: (courseData) => ({
                url: 'createCourse',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags:["Refetch-creator-course"]
        }),
        getPublishedCourse: builder.query({
            query:()=>({
                url:'getPublishedCourse',
                method: 'GET',
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: 'getAllCourses',
                method: 'GET',
            }),
            providesTags:["Refetch-creator-course"]
        }),
        editCourse: builder.mutation({
            query: ({courseId,formData}) => ({
                url: `editCourses/${courseId}`,
                method: 'PUT',
                body: formData,
            }),
        }),
        getCourseById:builder.query({
            query:(courseId)=>({
                url: `getCourseById/${courseId}`,
                method: 'GET',
            }),
        }),
        publishCourse:builder.mutation({
            query:({courseId,query})=>({
                url:`/${courseId}/?publish=${query}`,
                method:'PUT',
            })
        }),
        getSearchCourses :builder.query({
            query: ({searchQuery,catagories,sortByPrice})=>{
                let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

                if(catagories?.length > 0){
                    const catagoriesString = catagories.map(encodeURIComponent)
                    queryString += `&categories=${catagoriesString}`
                }

                if(sortByPrice){
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
                }

                return (
                    {
                        url: queryString,
                        method: 'GET',
                    }
                )

            }
        }),

    }),
});

export const {
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useEditCourseMutation, 
    useGetCourseByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery,
    useGetSearchCoursesQuery
} = courseApi;
