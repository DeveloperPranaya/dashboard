import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch API data
// export const fetchDashboardData = createAsyncThunk(
//   'dashboard/fetchData',
//   async (_, thunkAPI, selected) => {
//     try {
//       console.log("selected:-",selected)
//       const response = await axios.get(
//         //  'https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/dashboard-data'
//         // `https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/dashboard-data?business_area=Sales_-_Business_Area&layout=Cs_Layout`
//         // `https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/dashboard-data?business_area=${selected}&layout=Cs_Layout`,
//         `https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/dashboard-data?business_area=DPMS_-_Business_Area&layout=Cs_Layout`
//       );
//       return response.data.output;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (selected, thunkAPI) => {
    console.log("selected Data:-",selected);
    try {
      const { business_area, layout } = selected;
      const response = await axios.get(
        `https://demo-agent-api-bpfxcrcmhrbcfzht.eastus-01.azurewebsites.net/api/Dashboard/dashboard-data?business_area=${encodeURIComponent(business_area)}&layout=${encodeURIComponent(layout)}`
      );
      return response.data.output;
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
