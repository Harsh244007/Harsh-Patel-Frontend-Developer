import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSpaceXData } from "../../services/spaceXService";
import { RootState } from "./store";
import { Capsule } from "../types/Types";

interface SpaceXState {
  data: unknown[];
  loading: boolean;
}

const initialState: SpaceXState = {
  data: [],
  loading: false,
};

export const fetchData = createAsyncThunk(
  "spaceX/fetchData",
  async (filters: Capsule) => {
    const data = await fetchSpaceXData(filters);
    return data;
  }
);

const spaceXSlice = createSlice({
  name: "spaceX",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.data = [];
      });
  },
});

export default spaceXSlice.reducer;
export const selectSpaceXData = (state: RootState) => state.spaceX.data;
export const selectSpaceXLoading = (state: RootState) => state.spaceX.loading;
