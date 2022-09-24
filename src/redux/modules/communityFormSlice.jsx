import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";

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
    const { data } = await tokenInstance.post(`/community`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* --------------------- patch community detail (Update) -------------------- */
export const patchCommunityDetail = createAsyncThunk("comment/patch", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/community/${payload.communityId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    console.log(err.response.data.message);
  }
});

/* -------------------- delete community detail (Delete) -------------------- */
export const deleteCommunityDetail = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    await tokenInstance.delete(`/proof/{proofId}`);
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
      state.dates = action.payload;
    },
    addDateLists: (state, action) => {
      state.dateLists = action.payload;
    },
  },
  extraReducers: {
    /* --------------------- post community detail (Create) --------------------- */
    [postCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [postCommunityDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [postCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
