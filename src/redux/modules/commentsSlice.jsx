import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};

/* -------------------------- post comment (Create) ------------------------- */
export const postComment = createAsyncThunk("comment/post", async (formData, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${API_URL}/comments/{replayId}`, formData, {
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

/* --------------------------- get comment (Read) --------------------------- */
export const getComments = createAsyncThunk("comment/get", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(`${API_URL}/replay/{replayId}`, {
      Authorization: token,
    });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejected(error);
  }
});

/* ------------------------- patch comment (Update) ------------------------- */
export const patchComment = createAsyncThunk("comment/patch", async (formData, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(`${API_URL}/comments/{replayId}`, formData, {
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

/* ------------------------- delete comment (Delete) ------------------------ */
export const deleteComments = createAsyncThunk("comment/delete", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/comment/{commentId}`, {
      headers: {
        Authorization: token,
      },
    });
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
  reducers: {},
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
      state.detail = action.payload;
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

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
