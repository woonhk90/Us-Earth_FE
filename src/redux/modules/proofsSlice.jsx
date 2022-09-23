import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  proofs: [],
  heartCommentCnt: {},
  heartCnt: {},
  userHeart: false,
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
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log("갯요청다시~");
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
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
  } catch (error) {
    console.log(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* ------------------------- delete proof (Delete) ------------------------ */
export const deleteProof = createAsyncThunk("proof/delete", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.delete(`${API_URL}/proof/${proofId}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

/* ------------------------ get heartCnt & commentCnt ----------------------- */
export const getHeartCommentCnt = createAsyncThunk("proof/heartComment", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.get(`${API_URL}/proof/count/${proofId}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log("하트댓글갯수", data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
/* ------------------------ patch heart ----------------------- */
export const patchHeartCnt = createAsyncThunk("proof/Heart", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    console.log(authorization_token);
    const { data } = await axios.patch(`${API_URL}/proof/heart/${proofId}`, "", {
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log(data);
    thunkAPI.dispatch(getHeartCommentCnt(proofId));
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
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
  reducers: {
    clickHerat: (state, action) => {
      console.log("슬라이스에서 바뀜!", action.payload);
      // adNumber이라는 명령(?)
      state.userHeart = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
      // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    },
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
      state.userHeart = action.payload.heart;
    },
    [patchHeartCnt.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clickHerat } = proofsSlice.actions;
export default proofsSlice.reducer;
