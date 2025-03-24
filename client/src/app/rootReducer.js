import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from '../Feature/api/authApi'
import authReducer from '../Feature/authSlice'



const rootReducer= combineReducers({
    [authApi.reducerPath] :authApi.reducer,
    auth:authReducer,
})

export default rootReducer;