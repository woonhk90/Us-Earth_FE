import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  proofs: [],
  isLoading: false,
  error: null,
};

/* -------------------------- post proof (Create) ------------------------- */
export const postProof = createAsyncThunk("proof/post", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.post(`${API_URL}/community/${payload.communityId}/proof`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
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
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.get(`${API_URL}/proof/${proofId}`, {
      Authorization: authorization_token,
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejected(error);
  }
});

/* ------------------------- patch proof (Update) ------------------------- */
export const patchProof = createAsyncThunk("proof/patch", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.patch(`${API_URL}/proof/${payload.proofId}`, payload.formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: authorization_token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

/* ------------------------- delete proof (Delete) ------------------------ */
export const deleteProofs = createAsyncThunk("proof/delete", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    await axios.delete(`${API_URL}/proof/{proofId}`, {
      headers: {
        Authorization: authorization_token,
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

export const proofsSlice = createSlice({
  name: "proofs",
  initialState,
  reducers: {},
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
    [deleteProofs.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProofs.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteProofs.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = proofsSlice.actions;
export default proofsSlice.reducer;
