import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const purchaseApi=createApi({
    reducerPath: 'purchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://coursecove-fgew.onrender.com/api/v1/purchases/',
        credentials: 'include',
    }),
    endpoints:(builder)=>({
        createCheckoutSession:builder.mutation({
            query:(courseId)=>({
                url:'/checkout/create-checkout-session',
                method:'POST',
                body:{courseId},
            })
        }),
        getCourseDetailWithStatus: builder.query({
            query: (courseId)=>({
                url: `/course/${courseId}/detail-with-status`,
                method: 'GET',
            })
        }),
        getPurchasedCourses: builder.query({
            query:()=>({
                url:'/getAllPurchasedCourse',
                method:'GET',
            })
        })
    })
})

export const {
    useCreateCheckoutSessionMutation,
    useGetCourseDetailWithStatusQuery,
    useGetPurchasedCoursesQuery,
}=purchaseApi;