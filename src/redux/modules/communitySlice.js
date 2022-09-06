import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/* ----------------------------- 전체 그룹 모임 정보 출력 ----------------------------- */
export const __getCommunity = createAsyncThunk("todos/__getCommunity", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunity=>', payload);
    const search = payload.search;
    const data = await axios.get(`http://13.209.97.209/api/community?page=${payload.page}&size=10&title=${payload.search}`);
    // const data = await axios.get(`https://www.sparta99.com/api/community?page=${payload.page}&size=10&title=${payload.search}`);
    console.log('커뮤니티=>', data);

    return thunkAPI.fulfillWithValue({ data: data.data, search: search });
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});
/* -------------------------------- 커뮤니티 상세보기 ------------------------------- */
export const __getCommunityDetail = createAsyncThunk("todos/__getCommunityDetail", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunityDetail=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`http://13.209.97.209/api/community/${payload.communityId}`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log('커뮤니티=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});
/* --------------------------- 커뮤니티 참여하기 버튼 눌렀을 때 --------------------------- */
export const __updateCommunityJoin = createAsyncThunk("todos/__updateCommunityJoin", async (payload, thunkAPI) => {
  try {
    console.log('__updateCommunityJoin=>', payload);
    const authorization_token = cookies.get("mycookie");
    // const data = await axios.patch(`http://13.209.97.209/api/join/${payload.communityId}`, payload, {
    await axios.patch(`http://13.209.97.209/api/join/${payload.communityId}`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });

    // return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

const initialState = {
  community: [],
  search: '',
  communityDetail: []
}

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    clearVal: (state) => { state.community = [] },
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
    }
  },
});

export const { clearVal, ingVal } = communitySlice.actions;
export default communitySlice.reducer;