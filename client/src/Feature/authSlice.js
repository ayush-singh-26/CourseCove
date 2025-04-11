import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false,
    loading : true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        userLoggedIn: (state,action)=>{
            state.user =action.payload;
            state.isAuthenticated = true;
            state.loading=false;
        },
        userLoggedOut: (state)=>{
            state.user=null;
            state.isAuthenticated = false;
            state.loading=false;
        }
    }
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions;

export default authSlice.reducer;