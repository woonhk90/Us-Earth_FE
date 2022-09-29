import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";
import { getHeartCommentCnt } from "./heartCommentSlice";

const initialState = {
  comments: [],
  commentSelectBoxId: {},
  commentEdit: {
    editMode: false,
    commentId: "",
  },
  writeMode:"",
  isLoading: false,
  getIsLoading: false,
  error: null,
  commentNew:false,
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
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* --------------------------- get comment (Read) --------------------------- */
export const getComments = createAsyncThunk("comment/get", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/comments/${proofId}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
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
    // thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(commentEditChange({}));

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    thunkAPI.dispatch(commentEditChange({}));
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* ------------------------- delete comment (Delete) ------------------------ */
export const deleteComments = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    const data = await tokenInstance.delete(`/comments/${payload.commentId}`);
    // thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(getHeartCommentCnt(payload.proofId));
    return thunkAPI.fulfillWithValue(payload.commentId);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentSelectBox: (state, action) => {
      state.commentSelectBoxId = action.payload;
    },
    commentEditChange: (state, action) => {
      state.commentEdit = action.payload;
    },
    commentWriteMode:(state, action) => {
      state.writeMode = action.payload;
    },
    commentClearUp: (state) => {
      state.comments = [];
      state.commentSelectBoxId = {};
      state.commentEdit = {
        editMode: false,
        commentId: "",
      };
      state.isLoading = false;
      state.getIsLoading = false;
      state.error = null;
    },
  },
  extraReducers: {
    /* -------------------------- post comment (Create) ------------------------- */
    [postComment.pending]: (state) => {
      state.error = null;
      state.commentNew = false;
      state.isLoading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.commentNew = true;
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
      state.error = null;
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
      state.error = null;
      state.isLoading = true;
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.commentResponseDtoList = state.comments.commentResponseDtoList.filter((v) => v.commentId !== action.payload);
    },
    [deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { commentSelectBox, commentEditChange, commentClearUp,commentWriteMode } = commentsSlice.actions;
export default commentsSlice.reducer;
