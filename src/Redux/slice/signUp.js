import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/axios";
import { dispatch } from "../store/store";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

export const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
  },
});

export const signup = (payload) =>  async () =>  { 
  dispatch(signupSlice.actions.startLoading());
  try {
    const response = await axiosInstance.post(
      `add_user?username=${payload.username}&password=${payload.userpassword}&role=${payload.role}`,
      payload 
    );
    dispatch(signupSlice.actions.loginSuccess(response.data));
  } catch (e) {
    dispatch(signupSlice.actions.hasError(e));
  }
};

export const { startLoading, hasError, loginSuccess } = signupSlice.actions;
export default signupSlice.reducer;