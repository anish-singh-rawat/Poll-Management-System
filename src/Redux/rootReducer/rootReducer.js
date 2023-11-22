import { combineReducers } from "@reduxjs/toolkit";
import  signupSlice  from "../slice/signUp";
import  loginSlice  from "../slice/login";
import  pollSlice  from "../slice/userPoll";
import  adminPollSlice  from "../slice/AdminPoll";
import  listDataSlice  from "../slice/listData";
import  deleteTitleSlice  from "../slice/DeleteTitle";
import  deleteOptionSlice  from "../slice/deleteOption";

 const rootReducer = combineReducers({
    signupSlice : signupSlice,
    loginSlice : loginSlice,
    pollSlice : pollSlice,
    adminPollSlice : adminPollSlice,
    listDataSlice : listDataSlice,
    deleteTitleSlice : deleteTitleSlice,
    deleteOptionSlice : deleteOptionSlice,
})
export default rootReducer