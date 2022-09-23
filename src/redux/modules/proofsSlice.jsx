import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";

const initialState = {
  proofs: [],
  heartCommentCnt: {},
  heartCnt: {},
  isLoading: false,
  error: null,
  userHeart:false,
};

/* -------------------------- post proof (Create) ------------------------- */
export const postProof = createAsyncThunk("proof/post", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.post(`/community/${payload.communityId}/proof`, payload.formData, {
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

/* --------------------------- get proof (Read) --------------------------- */
export const getProofs = createAsyncThunk("proof/get", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/proof/${proofId}`);
    console.log("갯요청다시~");
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

/* ------------------------- patch proof (Update) ------------------------- */
export const patchProof = createAsyncThunk("proof/patch", async (payload, thunkAPI) => {
  try {
    const { data } = await tokenInstance.patch(`/proof/${payload.proofId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* ------------------------- delete proof (Delete) ------------------------ */
export const deleteProof = createAsyncThunk("proof/delete", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.delete(`/proof/${proofId}`);
    console.log(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const proofsSlice = createSlice({
  name: "proofs",
  initialState,
  reducers: {
  },
  extraReducers: {
    /* -------------------------- post proof (Create) ------------------------- */
    [postProof.pending]: (state) => {
      state.isLoading = true;
    },
    [postProof.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
    },
    [postProof.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* --------------------------- get proof (Read) --------------------------- */
    [getProofs.pending]: (state) => {
      state.isLoading = true;
    },
    [getProofs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.proofs = action.payload;
      console.log(action.payload,"겟인즈글")
      state.userHeart = action.payload.heart;
    },
    [getProofs.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ------------------------- patch proof (Update) ------------------------- */
    [patchProof.pending]: (state) => {
      state.isLoading = true;
    },
    [patchProof.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.communityform = action.payload;
    },
    [patchProof.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /* ------------------------- delete proof (Delete) ------------------------ */
    [deleteProof.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProof.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteProof.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { } = proofsSlice.actions;
export default proofsSlice.reducer;
