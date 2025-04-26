import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../constant";

export const lectureApi = createApi({
    reducerPath: 'lectureApi',
    tagTypes:["Refetch-creator-course","Refetch-lecture"],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/lectures/`,
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        addLecture:builder.mutation({
            query:({inputData,courseId})=>({
                url:`createLecture/${courseId}`,
                method: 'POST',
                body: inputData,
            })
        }),
        getCourseLectures : builder.query({
            query:(courseId)=>({
                url: `getCourseLectures/${courseId}`,
                method: 'GET',
            }),
            providesTags:["Refetch-lecture"],
        }),
        editLecture:builder.mutation({
            query:({lectureTitle,videoInfo,isPreviewFree,courseId,lectureId})=>({
                url:`editLecture/${courseId}/${lectureId}`,
                method:'PUT',
                body: {lectureTitle,videoInfo,isPreviewFree}
            })
        }),
        deleteLecture: builder.mutation({
            query:(courseId)=>({
                url:`deleteLecture/${courseId}`,
                method:'DELETE',
            }),
            invalidatesTags:["Refetch-lecture"],
        }),
        getLectureById: builder.query({
            query:(lectureId)=>({
                url:`getLectureById/${lectureId}`,
                method:'GET',
            })
        }),
        
    }),
});

export const {
    useAddLectureMutation,
    useGetCourseLecturesQuery,
    useEditLectureMutation,
    useGetLectureByIdQuery,
    useDeleteLectureMutation,
} = lectureApi;
