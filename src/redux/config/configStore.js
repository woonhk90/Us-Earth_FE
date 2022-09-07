import { configureStore } from "@reduxjs/toolkit";
import communityForm from "../modules/communityFormSlice";

export const store = configureStore({
  reducer: {
    communityForm,
  },
});
