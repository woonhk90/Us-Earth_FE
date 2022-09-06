import { configureStore } from "@reduxjs/toolkit";
import community from "../modules/communitySlice";

export const store = configureStore({
  reducer: {
    community
  }
});