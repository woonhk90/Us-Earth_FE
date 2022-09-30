import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenInstance } from "../../api/axios";

const initialState = {
  dailyMissionData: {},
  periodMissionData: [],
  clickDate: "",
  isLoading: false,
  error: null,
};

/* ---------------------- get daily mission data (Read) --------------------- */
export const getDailyMissionStats = createAsyncThunk("dailyMission/get", async (targetDay, thunkAPI) => {
  try {
        const { data } = await tokenInstance.get(`/mypage/stats/day?targetDay=${targetDay}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

/* ----------------- get monthly weekly mission data (Read) ----------------- */
export const getPeriodMissionStats = createAsyncThunk("periodMission/get", async (targetPeriod, thunkAPI) => {
  try {
    
    const { data } = await tokenInstance.get(`/mypage/stats`, {
      params: targetPeriod,
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    if (!error.response.data.msg) {
      return thunkAPI.rejectWithValue("에러가 발생했습니다. 관리자에게 문의하세요");
    } else return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

export const userMissionSlice = createSlice({
  name: "userMission",
  initialState,
  reducers: {
    getOnClickDate: (state, action) => {
      state.clickDate = action.payload; 
    },
    userMissionCleanUp: (state, action) => {
      state.dailyMissionData= {}
      state.periodMissionData= []
      state.clickDate= ""
      state.error= null
    },
  },
  extraReducers: {
    [getDailyMissionStats.pending]: (state) => {
      state.isLoading = true; 
    },
    [getDailyMissionStats.fulfilled]: (state, action) => {
      state.dailyMissionData = action.payload;
      state.isLoading = false; 
    },
    [getDailyMissionStats.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
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

export const { getOnClickDate,userMissionCleanUp } = userMissionSlice.actions;
export default userMissionSlice.reducer;
