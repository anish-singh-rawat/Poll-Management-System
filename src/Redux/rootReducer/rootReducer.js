import { combineReducers } from "@reduxjs/toolkit";
import  signupSlice  from "../slice/signUp";
import  loginSlice  from "../slice/login";
import  pollSlice  from "../slice/userPoll";
import  adminPollSlice  from "../slice/AdminPoll";

 const rootReducer = combineReducers({
    signupSlice : signupSlice,
    loginSlice : loginSlice,
    pollSlice : pollSlice,
    adminPollSlice : adminPollSlice,
})
export default rootReducer