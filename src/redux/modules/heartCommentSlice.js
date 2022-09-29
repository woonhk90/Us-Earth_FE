import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";

const initialState = {
  heartCommentCnt: {},
  heartCnt: {},
  isLoading: false,
  error: null,
};

/* ------------------------ get heartCnt & commentCnt ----------------------- */
export const getHeartCommentCnt = createAsyncThunk("proof/heartComment", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/proof/count/${proofId}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
/* ------------------------ patch heart ----------------------- */
export const patchHeartCnt = createAsyncThunk("proof/Heart", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/proof/heart/${proofId}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const heartCommentSlice = createSlice({
  name: "heartComment",
  initialState,
  reducers: {
    heartCommentCleanUp: (state, action) => {
      state.heartCommentCnt = {};
      state.heartCnt = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    /* ------------------------ get heartCnt & commentCnt ----------------------- */
    [getHeartCommentCnt.pending]: (state) => {
      state.isLoading = true;
    },
    [getHeartCommentCnt.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heartCommentCnt = action.payload;
    },
    [getHeartCommentCnt.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ------------------------ get heartCnt ----------------------- */
    [patchHeartCnt.pending]: (state) => {
      state.isLoading = true;
    },
    [patchHeartCnt.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heartCommentCnt.heart = action.payload.heart;
      state.heartCommentCnt.heartCnt = action.payload.heartCnt;
    },
    [patchHeartCnt.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { heartCommentCleanUp } = heartCommentSlice.actions;
export default heartCommentSlice.reducer;
