import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
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
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export const login = (payload) => async (dispatch) => {
  dispatch(loginSlice.actions.startLoading());
  try {
    const response = await axios.post(`https://etechpolltesting.onrender.com/login`);
    dispatch(loginSlice.actions.loginSuccess(response.data));
  } catch (e) {
    dispatch(loginSlice.actions.hasError(e));
  }
};

export const { startLoading, hasError, loginSuccess, resetReducer } = loginSlice.actions;
export default loginSlice.reducer;