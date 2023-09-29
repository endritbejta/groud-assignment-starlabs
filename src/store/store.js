import { configureStore } from "@reduxjs/toolkit";
import missionSlice from "./slices/missionSlice";
import rocketsSlice from "./slices/rocketsSlice";

const store = configureStore({
  reducer: {
    // here we include the slices we make
    missions: missionSlice,
    rockets: rocketsSlice
  },
});

export default store;
