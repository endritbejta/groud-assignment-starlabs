import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "";

const initialState = {
  missions: [],
  status: "idle",
  error: null,
};

// async functions to fetch data
export const fetchMissions = createAsyncThunk(
  "mission/fetchMissions",
  async () => {
    const response = await axios.get(URL);
    // check out carefully the response, the response.data that is returnded, can be accessed as action.payload in extraReducers. Just be careful what are we returning as action payload.
    console.log(response);
    return response.data;
  }
);

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = "success";
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllMissions = (state) => state.missions.missions;
export const selectStats = (state) => state.missions.status;
export const selectError = (state) => state.missions.error;

export default missionSlice.reducer;
