
/* ------------------------ get heartCnt & commentCnt ----------------------- */
export const getHeartCommentCnt = createAsyncThunk("proof/heartComment", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.get(`${API_URL}/proof/count/${proofId}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
/* ------------------------ patch heart ----------------------- */
export const patchHeartCnt = createAsyncThunk("proof/Heart", async (proofId, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const { data } = await axios.patch(`${API_URL}/proof/heart/${proofId}`, "", {
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log(data);
    thunkAPI.dispatch(getHeartCommentCnt(proofId));
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


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
    thunkAPI.dispatch(getHeartCommentCnt(payload.proofId));
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
      headers: {
        Authorization: authorization_token,
      },
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
    thunkAPI.dispatch(commentEditChange({}));
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
    thunkAPI.dispatch(getHeartCommentCnt(payload.proofId));
    console.log(data);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});