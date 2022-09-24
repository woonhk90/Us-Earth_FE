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
    
    console.log(targetDay);
    const { data } = await tokenInstance.get(`/mypage/stats/day?targetDay=${targetDay}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejected(error);
  }
});

/* ----------------- get monthly weekly mission data (Read) ----------------- */
export const getPeriodMissionStats = createAsyncThunk("periodMission/get", async (targetPeriod, thunkAPI) => {
  try {
    
    // console.log(targetPeriod);
    const { data } = await tokenInstance.get(`/mypage/stats`, {
      params: targetPeriod,
    });
    // console.log(data);
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
    getOnClickDate: (state, action) => {
      console.log("슬라이스에서 바뀜!", action.payload);
      state.clickDate = action.payload; 
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

export const { getOnClickDate } = userMissionSlice.actions;
export default userMissionSlice.reducer;
