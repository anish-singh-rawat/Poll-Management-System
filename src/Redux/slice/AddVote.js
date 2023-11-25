import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const AddVote = createSlice({
  name: "addVote",
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

export function VoteData(VoteId, VoteOptionText, header) {
  return async () => {
    dispatch(AddVote.actions.startLoading());
    try {
      const response = await Instance.get(`do_vote?id=${VoteId}&option_text=${VoteOptionText}`, header);
      dispatch(AddVote.actions.loginSuccess(response.data));
    } catch (error) {
      dispatch(AddVote.actions.hasError(error));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
  = AddVote.actions;
export default AddVote.reducer;


