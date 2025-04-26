import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../constant";

export const courseProgressApi = createApi({
    reducerPath : 'courseProgressApi',
    baseQuery : fetchBaseQuery({
        baseUrl : `${BASE_URL}/api/v1/progress/`,
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