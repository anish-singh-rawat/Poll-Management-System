import { combineReducers } from "@reduxjs/toolkit";
import  signupSlice  from "../slice/signUp";
import  loginSlice  from "../slice/login";

 const rootReducer = combineReducers({
    signupSlice : signupSlice,
    loginSlice : loginSlice,
})
export default rootReducer