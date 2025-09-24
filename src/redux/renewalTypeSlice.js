// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

// Async thunk to fetch dashboard data
export const fetchRenewalTypeData = createAsyncThunk(
  "dashboard/fetchRenewalTypeData",
  async (selected, thunkAPI) => {
    const { business_area, layout } = selected;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/Dashboard/${encodeURIComponent(business_area)}/${encodeURIComponent(layout)}`
      );

      return response.data; // Axios auto-parses JSON
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const renewalTypeSlice = createSlice({
  name: "renewalTypeData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRenewalTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRenewalTypeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRenewalTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default renewalTypeSlice.reducer;
