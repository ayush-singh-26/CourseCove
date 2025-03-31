import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from '../Feature/api/authApi'
import { courseApi } from '../Feature/api/courseApi'
import authReducer from '../Feature/authSlice'
import { purchaseApi } from '../Feature/api/purchaseApi'
import { lectureApi } from '../Feature/api/lectureApi'
import { courseProgressApi } from '../Feature/api/courseProgressApi'



const rootReducer= combineReducers({
    [authApi.reducerPath] :authApi.reducer,
    [courseApi.reducerPath] :courseApi.reducer,
    [lectureApi.reducerPath] :lectureApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath] : courseProgressApi.reducer,
    auth:authReducer,
})

export default rootReducer;