import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/* -------------------------------- 커뮤니티 상세보기 ------------------------------- */
export const __getMyInfo = createAsyncThunk("usearth/__getMyInfo", async (payload, thunkAPI) => {
  try {
    console.log('__getMyInfo=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`http://13.209.97.209/api/mypage`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log('MHPAGE=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

export const __updateMyInfoStatus = createAsyncThunk("usearch/__updateMyInfoStatus", async (payload, thunkAPI) => {
  try {
    console.log('__updateMyInfoStatus=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.patch(`http://13.209.97.209/api/mypage/secret`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data.data);
    // thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

export const __postNickNameOverlap = createAsyncThunk("usearth/__postNickNameOverlap", async (payload, thunkAPI) => {
  try {
    console.log('__postNickNameOverlap=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.post(`http://13.209.97.209/api/mypage/nickname`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>", data);
    return thunkAPI.fulfillWithValue(data.data);
    // thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

export const __postNickNameSubmit = createAsyncThunk("usearth/__postNickNameSubmit", async (payload, thunkAPI) => {
  try {
    console.log('__postNickNameSubmit=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.patch(`http://13.209.97.209/api/mypage/nickname`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>", data);
    return thunkAPI.fulfillWithValue(data.data);
    // thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* ------------------------------ 오늘의 미션 가지고 오기 ----------------------------- */
export const __getTodayMission = createAsyncThunk("usearth/__getTodayMission", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`http://13.209.97.209/api/missions`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>", data);
    return thunkAPI.fulfillWithValue(data.data);
    // thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

export const __updateMissionFlag = createAsyncThunk("usearth/__updateMissionFlag", async (payload, thunkAPI) => {
  try {
    console.log('__updateMissionFlag=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.patch(`http://13.209.97.209/api/missions`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>", data);
    // return thunkAPI.fulfillWithValue(data.data);
    thunkAPI.dispatch(__getTodayMission());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});


/* ----------------------------- 마이페이지 내가 속한 그룹미션 가져오기 ---------------------------- */
export const __getMyPageMissionGroup = createAsyncThunk("usearth/__getMyPageMissionGroup", async (payload, thunkAPI) => {
  try {
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`http://13.209.97.209/api/mypage/groupmission`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>", data);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});


const initialState = {
  userInfo: [],
  overlap: false,
  todayMission: [],
  myGroupList: [],
  saveCagegoryFlag: 'onGoing'
}

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    saveCagegory: (state, action) => {
      state.saveCagegoryFlag = action.payload; // 선택한 카테고리 save
    }
  },
  extraReducers: {
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      // state.userInfo.push(action.payload);
      state.userInfo = action.payload;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__updateMyInfoStatus.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__updateMyInfoStatus.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      // state.userInfo.push(action.payload);
      // state.userInfo[0].secret = action.payload;
      state.userInfo.secret = action.payload;
    },
    [__updateMyInfoStatus.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postNickNameOverlap.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postNickNameOverlap.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.overlap = action.payload;
    },
    [__postNickNameOverlap.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__updateMyInfoStatus.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postNickNameSubmit.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postNickNameSubmit.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userInfo.nickname = action.payload.nickname;
    },
    [__postNickNameSubmit.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getTodayMission.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodayMission.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todayMission = action.payload.dailyMission;
    },
    [__getTodayMission.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getMyPageMissionGroup.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getMyPageMissionGroup.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.myGroupList = action.payload;
    },
    [__getMyPageMissionGroup.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    }
  },
});

export const { saveCagegory } = mypageSlice.actions;
export default mypageSlice.reducer;