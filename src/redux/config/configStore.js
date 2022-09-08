import { configureStore } from "@reduxjs/toolkit";
import community from "../modules/communitySlice";
import mypage from "../modules/mypageSlice";
import communityForm from "../modules/communityFormSlice";
import comments from "../modules/commentsSlice";
import proofs from "../modules/proofsSlice";

export const store = configureStore({
  reducer: {
    community,
    mypage,
    communityForm,
    comments,
    proofs,
  },
});
