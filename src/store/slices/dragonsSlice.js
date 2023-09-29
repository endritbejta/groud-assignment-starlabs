import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://api.spacexdata.com/v3/dragons";

const initialState = {
  dragons: [],
  status: "idle",
  error: null,
};

// async functions to fetch data
export const fetchDragons = createAsyncThunk(
  "dragons/fetchDragons",
  async () => {
    const response = await axios.get(URL);
    // check out carefully the response, the response.data that is returnded, can be accessed as action.payload in extraReducers. Just be careful what are we returning as action payload.
    console.log(response);
    return response.data;
  }
);

const dragonSlice = createSlice({
  name: "dragons",
  initialState,
  reducers: {
    reserveDragon: (state, action) => {
      // finding the index of the clicked dragon
      const index = state.dragons.findIndex(
        (dragon) => dragon.dragon === action.payload
      );
      // if found then proceed
      if (index !== -1) {
        // update the dragon_reserved property, (we can don this type of mutating state, because in this version of redux, redux uses immer.js who helps us make the state change immutably even though we directy manipulate it )
        state.dragons[index].dragon_reserved = true;
      } else {
        return;
      }
    },
    cancelDragon: (state, action) => {
      const index = state.dragons.findIndex(
        (mission) => mission.mission_id === action.payload
      );
      if (index !== -1) {
        state.dragons[index].dragon_reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDragons.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDragons.fulfilled, (state, action) => {
        state.status = "success";
        state.dragons = action.payload;
      })
      .addCase(fetchDragons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.code + " " + action.error.message;
      });
  },
});

export const selectAllDragons = (state) => state.dragons.dragons;
export const selectDragonStatus = (state) => state.dragons.status;
export const selectDragonError = (state) => state.dragons.error;

export const { reserveDragon, cancelDragon } = dragonSlice.actions;

export default dragonSlice.reducer;
