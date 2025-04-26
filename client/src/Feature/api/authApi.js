import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn, userLoggedOut } from '../authSlice'
import BASE_URL from '../../constant';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/v1/users/`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: 'register',
                method: 'POST',
                body: inputData
            })
        }),
        
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: 'login',
                method: 'POST',
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;                    
                    dispatch(userLoggedIn( result.data ));                                        
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        loadUser: builder.query({
            query:()=>({
                url:'current-user',
                method:'GET',
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;                    
                    dispatch(userLoggedIn( result.data )); 
                                       
                } catch (error) {
                    console.log(error);
                    dispatch(userLoggedOut())
                }
            }
        }),

        logoutUser: builder.mutation({
            query:()=>({
                url:'logout',
                method: 'post'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("Logout error:", error);
                }
            },
        }),

        deleteUser: builder.mutation({
            query:()=>({
                url:'delete-user',
                method: 'delete'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("Delete user error:", error);
                }
            }
        }),

        changePassword : builder.mutation({
            query : (inputData)=>({
                url: 'change-password',
                method: 'PUT',
                body: inputData
            })
        }),
        getAllUsers : builder.query({
            query : ()=>({
                url:'getAllUsers',
                method: 'GET'
            })
        })
    }),
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useChangePasswordMutation,
    useLogoutUserMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery
} = authApi;