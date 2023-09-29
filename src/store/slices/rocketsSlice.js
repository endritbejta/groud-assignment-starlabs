import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://api.spacexdata.com/v3/rockets";

const initialState = {
  rockets: [],
  status: "idle",
  error: null,
};

// async functions to fetch data
export const fetchRockets = createAsyncThunk(
  "rockets/fetchRockets",
  async () => {
    const response = await axios.get(URL);
    // check out carefully the response, the response.data that is returnded, can be accessed as action.payload in extraReducers. Just be careful what are we returning as action payload.
    console.log(response);
    return response.data;
  }
);

const rocketsSlice = createSlice({
  name: "rockets",
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      // finding the index of the clicked rocket
      const index = state.rockets.findIndex(
        (rocket) => rocket.id === action.payload
      );
      // if found then proceed
      if (index !== -1) {
        // update the rocket_reserved property, (we can don this type of mutating state, because in this version of redux, redux uses immer.js who helps us make the state change immutably even though we directy manipulate it )
        state.rockets[index].rocket_reserved = true;
      } else {
        return;
      }
    },
    cancelReservation: (state, action) => {
      const index = state.rockets.findIndex(
        (rocket) => rocket.id === action.payload
      );
      if (index !== -1) {
        state.rockets[index].rocket_reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = "success";
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.code + " " + action.error.message;
      });
  },
});

export const selectAllRockets = (state) => state.rockets.rockets;
export const selectRocketsStatus = (state) => state.rockets.status;
export const selectRocketError = (state) => state.rockets.error;

export const { reserveRocket, cancelReservation } = rocketsSlice.actions;

export default rocketsSlice.reducer;
