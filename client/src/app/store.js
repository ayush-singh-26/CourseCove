import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import { authApi } from '../Feature/api/authApi';
import { courseApi } from '../Feature/api/courseApi';
import { purchaseApi } from '../Feature/api/purchaseApi';
import { lectureApi } from '../Feature/api/lectureApi';
import { courseProgressApi } from '../Feature/api/courseProgressApi';

const store=configureStore(
    {
        reducer:rootReducer,
        middleware :(defaultMiddleware) => defaultMiddleware({
            serializableCheck: false
        }).concat(authApi.middleware,courseApi.middleware,lectureApi.middleware, purchaseApi.middleware,courseProgressApi.middleware)
    }
);

const initializeApp= async ()=>{
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializeApp();

export default store;

