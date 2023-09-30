import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://api.spacexdata.com/v3/missions";

const initialState = {
  missions: [],
  status: "idle",
  error: null,
};

// async functions to fetch data
export const fetchMissions = createAsyncThunk(
  "missions/fetchMissions",
  async () => {
    const response = await axios.get(URL);
    // check out carefully the response, the response.data that is returnded, can be accessed as action.payload in extraReducers. Just be careful what are we returning as action payload.
    return response.data;
  }
);

const missionSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    joinMission: (state, action) => {
      // finding the index of the clicked mission
      const index = state.missions.findIndex(
        (mission) => mission.mission_id === action.payload
      );
      // if found then proceed
      if (index !== -1) {
        // update the mission_reserved property, (we can don this type of mutating state, because in this version of redux, redux uses immer.js who helps us make the state change immutably even though we directy manipulate it )
        state.missions[index].mission_reserved = true;
      } else {
        return;
      }
    },
    leaveMission: (state, action) => {
      const index = state.missions.findIndex(
        (mission) => mission.mission_id === action.payload
      );
      if (index !== -1) {
        state.missions[index].mission_reserved = false;
      }
    },
  },
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
        state.error = action.error.code + " " + action.error.message;
      });
  },
});

export const selectAllMissions = (state) => state.missions.missions;
export const selectMissionStatus = (state) => state.missions.status;
export const selectMissionError = (state) => state.missions.error;

export const { joinMission, leaveMission } = missionSlice.actions;

export default missionSlice.reducer;
