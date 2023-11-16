import { combineReducers } from "@reduxjs/toolkit";
import { signup, signupSlice } from "../slice/signUp";

export const rootReducer = combineReducers({
    signupSlice : signup
})