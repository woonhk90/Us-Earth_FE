import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";
import { __getCommunityDetail } from "./communitySlice";

const initialState = {
  proofs: [],
  isLoading: false,
  error: null,
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

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* --------------------------- get proof (Read) --------------------------- */
export const getProofs = createAsyncThunk("proof/get", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.get(`/proof/${proofId}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {

    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
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

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* ------------------------- delete proof (Delete) ------------------------ */
export const deleteProof = createAsyncThunk("proof/delete", async (proofId, thunkAPI) => {
  try {
    const { data } = await tokenInstance.delete(`/proof/${proofId}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const proofsSlice = createSlice({
  name: "proofs",
  initialState,
  reducers: {
    proofsCleanUp: (state, action) => {
      state.proofs = [];
      state.heartCommentCnt = {};
      state.heartCnt = {};
      state.error = null;
      state.userHeart = false;
    },
  },
  extraReducers: {
    /* -------------------------- post proof (Create) ------------------------- */
    [postProof.pending]: (state) => {
      state.isLoading = true;
    },
    [postProof.fulfilled]: (state, action) => {
      state.isLoading = false;
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

export const { proofsCleanUp } = proofsSlice.actions;
export default proofsSlice.reducer;
