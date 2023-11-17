import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    startLoading(state) {
      console.log(state);
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
  },
});

export function signup(payload) {
  return async () => {

    dispatch(signupSlice.actions.startLoading());

    try {
      const response = await
        axios.post(`https://etechpolltesting.onrender.com/add_user?username=${payload.username}&password=${payload.userpassword}&role=${payload.role}`);
      dispatch(signupSlice.actions.loginSuccess(response.data.data));
    } catch (e) {
      dispatch(signupSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess } = signupSlice.actions;
export default signupSlice.reducer;