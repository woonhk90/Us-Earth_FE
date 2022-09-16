import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

/* ----------------------------- 전체 그룹 모임 정보 출력 ----------------------------- */
export const __getCommunity = createAsyncThunk("usearth/__getCommunity", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunity=>', payload);
    const search = payload.search;
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(certifyReset());
    }
    const data = await axios.get(`${API_URL}/community?page=${payload.page}&size=10&title=${payload.search}`);
    console.log('전체커뮤니티=>', data);

    return thunkAPI.fulfillWithValue({ data: data.data, search: search });
  } catch (error) {
    window.alert("전체 커뮤니티 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* -------------------------------- 커뮤니티 상세보기 ------------------------------- */
export const __getCommunityDetail = createAsyncThunk("usearth/__getCommunityDetail", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunityDetail=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`${API_URL}/community/${payload.communityId}`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log('상세커뮤니티=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("커뮤니티 상세 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* --------------------------- 커뮤니티 참여하기 버튼 눌렀을 때 --------------------------- */
export const __updateCommunityJoin = createAsyncThunk("usearth/__updateCommunityJoin", async (payload, thunkAPI) => {
  try {
    console.log('__updateCommunityJoin=>', payload);
    const authorization_token = cookies.get("mycookie");
    await axios.patch(`${API_URL}/join/${payload.communityId}`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });

  } catch (error) {
    window.alert("참여하기에 실패 하였습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* ------------------------------ 인증 게시글 목록 출력 ------------------------------ */
export const __getCommunityCertify = createAsyncThunk("usearth/__getCommunityCertify", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunityCertify=>', payload);
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(certifyReset());
    }
    const data = await axios.get(`${API_URL}/community/${payload.communityId}/proof?page=${payload.page}&size=3`);
    console.log('인증게시글=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("인증 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* -------------------------------- 활발 그룹 출력 -------------------------------- */
export const __getPopularGroupItemList = createAsyncThunk("usearth/__getPopularGroupItemList", async (payload, thunkAPI) => {
  try {
    console.log('__getPopularGroupItemList=>', payload);
    const data = await axios.get(`${API_URL}/active`);
    console.log('활발그룹Slice=>', data);

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    window.alert("활발 그룹 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* ------------------------------- 마감임박 그룹 출력 ------------------------------- */
export const __getNewGroupItemList = createAsyncThunk("usearth/__getNewGroupItemList", async (payload, thunkAPI) => {
  try {
    console.log('__getNewGroupItemList=>', payload);
    const data = await axios.get(`${API_URL}/nearDone`);
    console.log('마감임박그룹Slice=>', data);

    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    window.alert("마감임박 그룹 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

const initialState = {
  community: [],
  search: '',
  communityDetail: [],
  certify: [],
  popularGroupList: [],
  newGroupList: [],
}

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    clearVal: (state) => { state.community = [] },
    certifyReset: (state) => { state.certify = [] },
    ingVal: (state, action) => { console.log(action); console.log(action); console.log(action); console.log(action); console.log(action); /* state.community = []  */ }
  },
  extraReducers: {
    [__getCommunity.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getCommunity.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', action.payload.data.content);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.community = [...state.community, ...action.payload.data.content];
      state.search = action.payload.search;
    },
    [__getCommunity.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCommunityDetail.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', action.payload);
      state.isLoading = false;
      state.communityDetail = action.payload;
    },
    [__getCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getCommunityCertify.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getCommunityCertify.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', ...action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.certify = [...state.certify, ...action.payload];
    },
    [__getCommunityCertify.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getPopularGroupItemList.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPopularGroupItemList.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.popularGroupList = action.payload.data;
    },
    [__getPopularGroupItemList.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getNewGroupItemList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNewGroupItemList.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false;
      state.newGroupList = action.payload.data;
    },
    [__getNewGroupItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

export const { clearVal, ingVal, certifyReset } = communitySlice.actions;
export default communitySlice.reducer;