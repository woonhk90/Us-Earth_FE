import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from '../../api/axios';

/* ------------------------------- 소식시 캠페인 리스트 ------------------------------ */
export const __getInfo = createAsyncThunk("usearth/__getInfo", async (payload, thunkAPI) => {
  try {
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(clearVal());
    }
    const data = await instance.get(`/campaigns?page=${payload.page}&size=5`);


    /* ---------------------------- 해당 페이지에 값이 있는지 확인 --------------------------- */
    if (data.data.length > 0) {
      thunkAPI.dispatch(hasMoreFn(true));
    } else {
      thunkAPI.dispatch(hasMoreFn(false));
    }

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("전체 캠페인 정보를 불러올 수 없습니다.");
    return;
  }
});

/* ---------------------------------- 환경 지수 --------------------------------- */
export const __getEnvironment = createAsyncThunk("usearth/__getEnvironment", async (payload, thunkAPI) => {
  try {

    const data = await instance.get('/community/airquality');


    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("환경지수 정보를 불러올 수 없습니다.");
    return;
  }
});

const initialState = {
  infoList: [],
  isLoading: false,
  infoEnvironment: [],
  hasMore: true,/* 무한스크롤 값이 더 있는지 확인 */
}

export const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    clearVal: (state) => { state.infoList = [] },
    hasMoreFn: (state, action) => { state.hasMore = action.payload; },
  },
  extraReducers: {
    [__getInfo.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getInfo.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.infoList = [...state.infoList, ...action.payload];
    },
    [__getInfo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getEnvironment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getEnvironment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.infoEnvironment = action.payload;
    },
    [__getEnvironment.rejected]: (state, action) => {
      state.isLoading = false;
    }
  },
});

export const { clearVal, hasMoreFn } = infoSlice.actions;
export default infoSlice.reducer;