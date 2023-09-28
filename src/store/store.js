import { configureStore } from "@reduxjs/toolkit";
import missionSlice from "./slices/missionSlice";

const store = configureStore({
  reducer: {
    // here we include the slices we make
    missions: missionSlice,
  },
});

export default store;
