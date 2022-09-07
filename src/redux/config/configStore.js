import { configureStore } from "@reduxjs/toolkit";
import community from "../modules/communitySlice";
import communityForm from "../modules/communityFormSlice";

export const store = configureStore({
  reducer: {
    community,
    communityForm,
  },
});
