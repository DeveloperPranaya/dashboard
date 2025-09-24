import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (selected, thunkAPI) => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlBusinessArea = searchParams.get("businessArea");
    try {
      const { business_area, layout } = selected;
      const finalBusinessArea = business_area || urlBusinessArea ;
      const [dashboardRes, schedulerRes] = await Promise.all([
        axios.get(
          `${API_BASE_URL}/Dashboard/dashboard-data?business_area=${encodeURIComponent(finalBusinessArea)}&layout=${encodeURIComponent(layout)}`
        ),
        axios.get(
          `${API_BASE_URL}/Dashboard/scheduler?baName=${encodeURIComponent(finalBusinessArea)}`
        )
      ]);

      return {
        dashboard: dashboardRes.data.output,
        scheduler: schedulerRes.data.output
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
