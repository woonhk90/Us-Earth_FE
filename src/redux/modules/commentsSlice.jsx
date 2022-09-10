import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

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
  error: null,
};

/* -------------------------- post comment (Create) ------------------------- */
export const postComment = createAsyncThunk("comment/post", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.post(`${API_URL}/comments/${payload.proofId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
      },
    });
    thunkAPI.dispatch(getComments(payload.proofId));
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* --------------------------- get comment (Read) --------------------------- */
export const getComments = createAsyncThunk("comment/get", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.get(`${API_URL}/comments/${proofId}`, {
      Authorization: authorization_token,
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejected(error);
  }
});

/* ------------------------- patch comment (Update) ------------------------- */
export const patchComment = createAsyncThunk("comment/patch", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.patch(`${API_URL}/comments/${payload.commentId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
      },
    });
    console.log(data);
    thunkAPI.dispatch(getComments(payload.proofId));
    thunkAPI.dispatch(commentEditChange({}));
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* ------------------------- delete comment (Delete) ------------------------ */
export const deleteComments = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const data = await axios.delete(`${API_URL}/comments/${payload.commentId}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    thunkAPI.dispatch(getComments(payload.proofId));
    console.log(data);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// export const postCommunityFormData = async (formData) => {
//   try {
//     const token = localStorage.getItem("token");
//     const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/articles`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         responseType: "blob",
//         Authorization: token,
//       },
//     });
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentSelectBox: (state, action) => {
      console.log("슬라이스에서 바뀜!",action.payload);
      // adNumber이라는 명령(?)
      state.commentSelectBoxId = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
      // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    },
    commentEditChange: (state, action) => {
      console.log(action.payload);
      // adNumber이라는 명령(?)
      state.commentEdit = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
      // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    },
  },
  extraReducers: {
    /* -------------------------- post comment (Create) ------------------------- */
    [postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [postComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
    },
    [postComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* --------------------------- get comment (Read) --------------------------- */
    [getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ------------------------- patch comment (Update) ------------------------- */
    [patchComment.pending]: (state) => {
      state.isLoading = true;
    },
    [patchComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
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
    },
    [deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { commentSelectBox, commentEditChange } = commentsSlice.actions;
export default commentsSlice.reducer;
