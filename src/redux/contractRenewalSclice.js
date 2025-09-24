// dashboardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

// Async thunk to fetch dashboard data
export const fetchContractRenewaldData = createAsyncThunk(
  "dashboard/fetchContractRenewaldData",
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

const contractRenewalSclice = createSlice({
  name: "renewalData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractRenewaldData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractRenewaldData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContractRenewaldData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contractRenewalSclice.reducer;
