import { configureStore } from "@reduxjs/toolkit";
import community from "../modules/communitySlice";
import mypage from "../modules/mypageSlice";

export const store = configureStore({
  reducer: {
    community,
    mypage
  }
});