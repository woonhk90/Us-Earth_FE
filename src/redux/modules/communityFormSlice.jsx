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
    return thunkAPI.fulfillWithValue(data);
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

/* --------------------- patch community detail (Update) -------------------- */
export const patchCommunityDetail = createAsyncThunk("community/patch", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/community/${payload.communityId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

/* -------------------- delete community detail (Delete) -------------------- */
export const deleteCommunityDetail = createAsyncThunk("community/delete", async (payload, thunkAPI) => {
  try {
    await tokenInstance.delete(`/proof/{proofId}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
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
    communityFormCleanUp: (state, action) => {
      state.detail= {}
      state.dates= {}
      state.dateLists= []
      state.isLoading= false
      state.error = null
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

export const { addDates, addDateLists,communityFormCleanUp } = communityFormSlice.actions;
export default communityFormSlice.reducer;
