import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  detail: {},
  dates: {},
  dateLists: [],
  isLoading: false,
  error: null,
};

/* --------------------- post community detail (Create) --------------------- */
export const postCommunityDetail = createAsyncThunk("community/postform", async (formData, thunkAPI) => {
  try {
    // const token = localStorage.getItem("token");
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.post(`${API_URL}/community`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* ----------------------- get community detail (Read) ---------------------- */
// export const getCommunityDetail = createAsyncThunk("comment/get", async (communityId, thunkAPI) => {
//   try {
//     const authorization_token = cookies.get("mycookie");
//     const { data } = await axios.get(`${API_URL}/community/${communityId}`, {
//       Authorization: authorization_token,
//     });
//     return thunkAPI.fulfillWithValue(data);
//   } catch (error) {
//     return thunkAPI.rejected(error);
//   }
// });

/* --------------------- patch community detail (Update) -------------------- */
export const patchCommunityDetail = createAsyncThunk("comment/patch", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.patch(`${API_URL}/community/${payload.communityId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* -------------------- delete community detail (Delete) -------------------- */
export const deleteCommunityDetail = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    await axios.delete(`${API_URL}/proof/{proofId}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
    /* --------------------- post community detail (Create) --------------------- */
    [postCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [postCommunityDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.communityform = action.payload;
    },
    [postCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ----------------------- get community detail (Read) ---------------------- */
    // [getCommunityDetail.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getCommunityDetail.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.detail = action.payload;
    // },
    // [getCommunityDetail.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    /* --------------------- patch community detail (Update) -------------------- */
    [patchCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [patchCommunityDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
    },
    [patchCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* -------------------- delete community detail (Delete) -------------------- */
    [deleteCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCommunityDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addDates, addDateLists } = communityFormSlice.actions;
export default communityFormSlice.reducer;
