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
        state.error = action.payload;
      });
  },
});

export const selectAllMissions = (state) => state.missions.missions;
export const selectMissionsLoading = (state) => state.missions.status;
export const selectMissionsError = (state) => state.missions.error;

export const { joinMission } = missionSlice.actions;

export default missionSlice.reducer;
