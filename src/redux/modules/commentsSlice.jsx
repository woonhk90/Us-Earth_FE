import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";
import { getHeartCommentCnt } from "./heartCommentSlice";

const initialState = {
  comments: [],
  commentSelectBoxId: {},
  commentEdit: {
    editMode: false,
    comment: "",
    commentImg: "",
    commentId: "",
  },
  isLoading: false,
  getIsLoading: false,
  error: null,
};

/* -------------------------- post comment (Create) ------------------------- */
export const postComment = createAsyncThunk("comment/post", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.post(`/comments/${payload.proofId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    // thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(getHeartCommentCnt(payload.proofId));
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/* --------------------------- get comment (Read) --------------------------- */
export const getComments = createAsyncThunk("comment/get", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/comments/${proofId}`);
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

/* ------------------------- patch comment (Update) ------------------------- */
export const patchComment = createAsyncThunk("comment/patch", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/comments/${payload.commentId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    console.log(data);
    // thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(commentEditChange({}));

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(commentEditChange({}));
    return thunkAPI.rejectWithValue(error);
  }
});

/* ------------------------- delete comment (Delete) ------------------------ */
export const deleteComments = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    const data = await tokenInstance.delete(`/comments/${payload.commentId}`);
    // thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(getHeartCommentCnt(payload.proofId));
    console.log(data);
    return thunkAPI.fulfillWithValue(payload.commentId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentSelectBox: (state, action) => {
      console.log("슬라이스에서 바뀜!", action.payload);
      state.commentSelectBoxId = action.payload;
    },
    commentEditChange: (state, action) => {
      console.log(action.payload);
      state.commentEdit = action.payload;
    },
  },
  extraReducers: {
    /* -------------------------- post comment (Create) ------------------------- */
    [postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      // state.comments.commentResponseDtoList
      // = [...state.comments.commentResponseDtoList, action.payload];

      // state.comments.commentResponseDtoList = state.comments.commentResponseDtoList.concat(action.payload)
      state.comments.commentResponseDtoList.push(action.payload);
    },
    [postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* --------------------------- get comment (Read) --------------------------- */
    [getComments.pending]: (state) => {
      state.getIsLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.getIsLoading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.getIsLoading = false;
      state.error = action.payload;
    },
    /* ------------------------- patch comment (Update) ------------------------- */
    [patchComment.pending]: (state) => {
      state.isLoading = true;
    },
    [patchComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.commentResponseDtoList = state.comments.commentResponseDtoList.map((comment) =>
        comment.commentId === action.payload.commentId ? { ...comment, content: action.payload.content, img: action.payload.img } : comment
      );
    },
    [patchComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ------------------------- delete comment (Delete) ------------------------ */
    [deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.comments.commentResponseDtoList = state.comments.commentResponseDtoList.filter((v) => v.commentId !== action.payload);
    },
    [deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { commentSelectBox, commentEditChange } = commentsSlice.actions;
export default commentsSlice.reducer;
