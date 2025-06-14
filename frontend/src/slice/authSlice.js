import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
       setCredentials:(state, action) => {
          state.userInfo = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
       },
       logout: (state, action) => {
         state.userInfo = null;
         localStorage.removeItem("userInfo");
       }
    }
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;


// setCredentials: (state, action) => {
//             const userData = {
//                 _id: action.payload._id,
//                 name: action.payload.name,
//                 email: action.payload.email,
//                 isAdmin: action.payload.isAdmin,
//                 token: action.payload.token
//             };
//             state.userInfo = userData;
//             localStorage.setItem("userInfo", JSON.stringify(userData));