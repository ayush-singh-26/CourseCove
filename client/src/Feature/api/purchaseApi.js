import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../constant";


export const purchaseApi=createApi({
    reducerPath: 'purchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/purchases/`,
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