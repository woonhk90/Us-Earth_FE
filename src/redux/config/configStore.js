import { configureStore } from "@reduxjs/toolkit";
import community from "../modules/communitySlice";
import communityForm from "../modules/communityFormSlice";
import comments from "../modules/commentsSlice";

export const store = configureStore({
  reducer: {
    community,
    communityForm,
    comments,
  },
});
