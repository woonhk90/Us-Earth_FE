import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

const initialState = {
  dailyMissionData: {},
  periodMissionData: {},
  isLoading: false,
  error: null,
};

/* ---------------------- get daily mission data (Read) --------------------- */
export const getDailyMissionStats = createAsyncThunk("dailyMission/get", async (targetDay, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    console.log(targetDay);
    console.log(authorization_token);
    const { data } = await axios.get(`${API_URL}/mypage/stats/day?targetDay=${targetDay}`, {
      headers: {
        Authorization: authorization_token,
      },
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejected(error);
  }
});

/* ----------------- get monthly weekly mission data (Read) ----------------- */
export const getPeriodMissionStats = createAsyncThunk("periodMission/get", async (targetPeriod, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    console.log(targetPeriod);
    console.log(authorization_token);
    const { data } = await axios.get(`${API_URL}/mypage/stats`, targetPeriod, {
      Authorization: authorization_token,
    });
    console.log("getPeriodMissionStats", data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejected(error);
  }
});

export const userMissionSlice = createSlice({
  name: "userMission",
  initialState,
  reducers: {
    // commentSelectBox: (state, action) => {
    //   console.log("슬라이스에서 바뀜!",action.payload);
    //   // adNumber이라는 명령(?)
    //   state.commentSelectBoxId = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
    //   // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    // },
    // commentEditChange: (state, action) => {
    //   console.log(action.payload);
    //   // adNumber이라는 명령(?)
    //   state.commentEdit = action.payload; // action creator함수를 생성하지 않고도 바로 payload를 사용할 수 있게 됩니다.
    //   // Action Value 까지 함수의 이름을 따서 자동으로 만들어진다.
    // },
  },
  extraReducers: {
    [getDailyMissionStats.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [getDailyMissionStats.fulfilled]: (state, action) => {
      state.dailyMissionData = action.payload;
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [getDailyMissionStats.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    /* -------------------------- get mission stats (Create) ------------------------- */
    [getPeriodMissionStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getPeriodMissionStats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.periodMissionData = action.payload;
    },
    [getPeriodMissionStats.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = userMissionSlice.actions;
export default userMissionSlice.reducer;
