// src/configs/store/spaceXSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Import your RootState type
import { fetchSpaceXData } from "../../services/spaceXService";
interface SpaceXState {
  data: unknown[]; // Define your data structure
  loading: boolean;
  error: string | null;
}

const initialState: SpaceXState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "spaceX/fetchData",
  async (filters: string) => {
    const data = await fetchSpaceXData(filters);
    return data;
  }
);

const spaceXSlice = createSlice({
  name: "spaceX",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<unknown[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  spaceXSlice.actions;

export default spaceXSlice.reducer;

export const selectSpaceXData = (state: RootState) => state.spaceX.data;
export const selectSpaceXLoading = (state: RootState) => state.spaceX.loading;
export const selectSpaceXError = (state: RootState) => state.spaceX.error;
