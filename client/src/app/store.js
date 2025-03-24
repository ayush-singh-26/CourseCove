import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import { authApi } from '../Feature/api/authApi';

const store=configureStore(
    {
        reducer:rootReducer,
        middleware :(defaultMiddleware) => defaultMiddleware({
            serializableCheck: false
        }).concat(authApi.middleware)
    }
);

const initializeApp= async ()=>{
    await store.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializeApp();

export default store;

