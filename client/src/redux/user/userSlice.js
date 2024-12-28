import { createSlice, current } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error: null,
    loading:false
};
const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSucess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserfailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteUserfailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        logoutUserStart:(state)=>{
            state.loading=true;
        },
        logoutUserSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        logoutUserfailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    }
});
export const {signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSucess,updateUserfailure,deleteUserStart,deleteUserSuccess,deleteUserfailure,logoutUserStart,logoutUserSuccess,logoutUserfailure}=userSlice.actions;
export default userSlice.reducer;