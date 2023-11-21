import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};
const listDataSlice = createSlice({
  name: "listDataSlice",
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

export function listData(payload) {
  return async () => {
    dispatch(listDataSlice.actions.startLoading());
    try {
        // const response = await axios.post(`https://etechpolltesting.onrender.com/add_poll?title=${payload.title}&options=opt1____opt2____opt3____opt4`);
      // dispatch(listDataSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(listDataSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer } 
= listDataSlice.actions;
export default listDataSlice.reducer;


