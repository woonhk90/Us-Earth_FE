import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL_INFO;

/* ------------------------------- 소식시 캠페인 리스트 ------------------------------ */
export const __getInfo = createAsyncThunk("usearth/__getInfo", async (payload, thunkAPI) => {
  try {
    console.log('__getInfo=>', payload);
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(clearVal());
    }
    const data = await axios.get(`${API_URL}/campaigns?page=${payload.page}&size=5`);
    console.log('전체캠페인=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("전체 캠페인 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});



const initialState = {
  infoList: [],
  isLoading: false,
}

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    clearVal: (state) => { state.infoList = [] }
  },
  extraReducers: {
    [__getInfo.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getInfo.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.infoList = [...state.infoList, ...action.payload];
    },
    [__getInfo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    }
  },
});

export const { clearVal } = infoSlice.actions;
export default infoSlice.reducer;