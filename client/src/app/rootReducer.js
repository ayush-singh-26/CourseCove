import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from '../Feature/api/authApi'
import { courseApi } from '../Feature/api/courseApi'
import authReducer from '../Feature/authSlice'
import { lectureApi } from '../Feature/api/lectureApi'



const rootReducer= combineReducers({
    [authApi.reducerPath] :authApi.reducer,
    [courseApi.reducerPath] :courseApi.reducer,
    [lectureApi.reducerPath] :lectureApi.reducer,
    auth:authReducer,
})

export default rootReducer;