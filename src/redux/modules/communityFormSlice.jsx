import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  communityform: [],
  dates: {},
  dateLists: [],
  isLoading: false,
  error: null,
};

export const postCommunityForm = createAsyncThunk("community/postform", async (formData, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/articles`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const communityFormSlice = createSlice({
  name: "communityForm",
  initialState,
  reducers: {
    addDates: (state, action) => {
      console.log(action.payload);
      // adNumber이라는 명령(?)
      state.dates = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
      // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    },
    addDateLists: (state, action) => {
      // console.log(action.payload);
      state.dateLists = action.payload;
      // state.dateLists = [new Date(action.payload[0]), new Date(action.payload[1])]; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
    },
  },
  extraReducers: {
    [postCommunityForm.pending]: (state) => {
      state.isLoading = true;
    },
    [postCommunityForm.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
    },
    [postCommunityForm.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addDates, addDateLists } = communityFormSlice.actions;
export default communityFormSlice.reducer;
