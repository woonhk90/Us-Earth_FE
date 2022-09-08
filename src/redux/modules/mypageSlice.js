import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

/* -------------------------------- 커뮤니티 상세보기 ------------------------------- */
export const __getMyInfo = createAsyncThunk("todos/__getMyInfo", async (payload, thunkAPI) => {
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

export const __updateMyInfoStatus = createAsyncThunk("todos/__updateMyInfoStatus", async (payload, thunkAPI) => {
  try {
    console.log('__updateMyInfoStatus=>', payload);
    const authorization_token = cookies.get("mycookie");
    await axios.patch(`http://13.209.97.209/api/mypage/status`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });

    // return thunkAPI.fulfillWithValue(data.data);
    thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

export const __postNickNameOverlap = createAsyncThunk("todos/__postNickNameOverlap", async (payload, thunkAPI) => {
  try {
    console.log('__postNickNameOverlap=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.post(`http://13.209.97.209//api/mypage/nickname`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log("DATA=>",data);
    return thunkAPI.fulfillWithValue(data.data);
    // thunkAPI.dispatch(__getMyInfo());
  } catch (error) {
    window.alert("정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});


// });
// export const __updateCommunityJoin = createAsyncThunk("todos/__updateCommunityJoin", async (payload, thunkAPI) => {
//   try {
//     console.log('__updateCommunityJoin=>', payload);
//     const authorization_token = cookies.get("mycookie");
//     await axios.patch(`http://13.209.97.209/api/join/${payload.communityId}`, payload, {
//       headers: {
//         Authorization: authorization_token
//       },
//     });

//     // return thunkAPI.fulfillWithValue(data.data);
//   } catch (error) {
//     window.alert("정보를 불러올 수 없습니다.");
//     console.log(error);
//     console.log(error.response.data.errorMessage);
//     return;
//   }
// });

const initialState = {
  userInfo: [],
  overlap: false
}

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
  },
  extraReducers: {
    [__getMyInfo.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      console.log('action=>', action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.userInfo = action.payload;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    }
  },
});

export const { } = mypageSlice.actions;
export default mypageSlice.reducer;