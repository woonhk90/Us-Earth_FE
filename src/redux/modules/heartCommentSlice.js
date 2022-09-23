import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";

const initialState = {
  proofs: [],
  heartCommentCnt: {},
  heartCnt: {},
  userHeart: false,
  isLoading: false,
  error: null,
};


/* ------------------------ get heartCnt & commentCnt ----------------------- */
export const getHeartCommentCnt = createAsyncThunk("proof/heartComment", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/proof/count/${proofId}`);
    console.log("하트댓글갯수", data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
/* ------------------------ patch heart ----------------------- */
export const patchHeartCnt = createAsyncThunk("proof/Heart", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/proof/heart/${proofId}`);
    console.log(data);
    thunkAPI.dispatch(getHeartCommentCnt(proofId));
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const heartCommentSlice = createSlice({
  name: "heartComment",
  initialState,
  reducers: {
    clickHerat: (state, action) => {
      console.log("슬라이스에서 바뀜!", action.payload);
      // adNumber이라는 명령(?)
      state.userHeart = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
      // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    },
  },
  extraReducers: {
    /* ------------------------ get heartCnt & commentCnt ----------------------- */
    [getHeartCommentCnt.pending]: (state) => {
      state.isLoading = true;
    },
    [getHeartCommentCnt.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
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
      state.heartCnt = action.payload;
      console.log(action.payload)
      state.userHeart = action.payload.heart;
    },
    [patchHeartCnt.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clickHerat } = heartCommentSlice.actions;
export default heartCommentSlice.reducer;
