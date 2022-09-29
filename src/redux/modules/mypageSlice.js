import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenInstance } from "../../api/axios";
import { getCookie, removeCookie, setCookie, setCookieTimeZero } from "../../shared/cookie";


/* -------------------------------- 내 정보 가져오기 ------------------------------- */
export const __getMyInfo = createAsyncThunk("usearth/__getMyInfo", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.get('/mypage');


    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("내 정보를 불러올 수 없습니다.");
    return;
  }
});

/* ------------------------------- 내 정보 공개/비공개 ------------------------------ */
export const __updateMyInfoStatus = createAsyncThunk("usearch/__updateMyInfoStatus", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.patch('/mypage/secret', payload);


    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("정보공개 정보를 불러올 수 없습니다.");
    return;
  }
});

/* -------------------------------- 닉네임 중복 확인 ------------------------------- */
export const __postNickNameOverlap = createAsyncThunk("usearth/__postNickNameOverlap", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.post('/mypage/nickname', payload);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("닉네임 중복확인을 할 수 없습니다.");
    return;
  }
});

/* --------------------------------- 닉네임 변경 --------------------------------- */
export const __postNickNameSubmit = createAsyncThunk("usearth/__postNickNameSubmit", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.patch('/mypage/nickname', payload);

    if (data.data.success) {
      const returnData = await axios.get(`${process.env.REACT_APP_API_URL_NOT_AIP}/user/reissue`, {
        headers: {
          refreshToken: getCookie('refreshToken'),
          memberId: getCookie('memberId'),
        },
      });
      removeCookie("mycookie");
      setCookie("mycookie", returnData.headers.authorization);
    }

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("닉네임 변경에 실패 하였습니다.");
    return;
  }
});

/* ------------------------------ 오늘의 미션 가지고 오기 ----------------------------- */
export const __getTodayMission = createAsyncThunk("usearth/__getTodayMission", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.get('/missions');


    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("오늘의 미션 정보를 불러올 수 없습니다.");
    return;
  }
});

/* ------------------------------ 오늘의 미션 완료 처리 ------------------------------ */
export const __updateMissionFlag = createAsyncThunk("usearth/__updateMissionFlag", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.patch('/missions', payload);

    await thunkAPI.dispatch(__getTodayMission());
    await thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    // window.alert("오늘의 미션을 완료처리 할 수 없습니다.");
    return;
  }
});


/* ----------------------------- 마이페이지 내가 속한 그룹미션 가져오기 ---------------------------- */
export const __getMyPageMissionGroup = createAsyncThunk("usearth/__getMyPageMissionGroup", async (payload, thunkAPI) => {
  try {

    const data = await tokenInstance.get('/mypage/groupmission');

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    // window.alert("그룹미션 정보를 불러올 수 없습니다.");
    return;
  }
});


const initialState = {
  userInfo: [],
  overlap: false,
  todayMission: [],
  myGroupList: [],
  saveCagegoryFlag: 'ongoing'
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