import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    status: false,
    loading:false,
    userData:null,
}

const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginStart(state){
            state.status=false;
            state.loading=true;
        },
        loginSuccess(state,action){
            state.status=true;
            state.loading=false;
            state.userData=action.payload;
        },
        loginFailure(state,action){
            state.status=false;
            state.loading=false;
            state.userData=null;
        },
        logout(state){
            state.status=false;
            state.loading=false;
            state.userData=null;
        },
        deleteUser(state){
            state.userData=null;
            state.status=false;
            state.loading=false; 
        }
    }
    
})

export const {loginStart, loginSuccess, loginFailure, logout, deleteUser} = authslice.actions;

export default authslice.reducer;