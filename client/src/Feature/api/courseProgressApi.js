import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseProgressApi = createApi({
    reducerPath : 'courseProgressApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://coursecove-fgew.onrender.com/api/v1/progress/',
        credentials : 'include'
    }),

    endpoints:(builder)=>({
        getCourseProgress : builder.query({
            query: (courseId)=>({
                url:`${courseId}`,
                method: 'GET'
            }),
        }),
        updateLectureProgress: builder.mutation({
            query: ({courseId,lectureId})=>({
                url: `${courseId}/lecture/${lectureId}`,
                method:'POST',
            }),
        }),
        markAsCompleted: builder.mutation({
            query:({courseId})=>({
                url: `${courseId}`,
                method:'PUT',
            })
        })
    })
})

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useMarkAsCompletedMutation
}=courseProgressApi;