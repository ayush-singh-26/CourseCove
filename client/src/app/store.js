import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import { authApi } from '../Feature/api/authApi';
import { courseApi } from '../Feature/api/courseApi';
import { lectureApi } from '../Feature/api/lectureApi';

const store=configureStore(
    {
        reducer:rootReducer,
        middleware :(defaultMiddleware) => defaultMiddleware({
            serializableCheck: false
        }).concat(authApi.middleware,courseApi.middleware,lectureApi.middleware,)
    }
);

const initializeApp= async ()=>{
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializeApp();

export default store;

