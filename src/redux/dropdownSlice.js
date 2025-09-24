
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

export const dropDownData = createAsyncThunk(
  "dropdown/dropDownData",
  async (_, thunkAPI) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const rowKey = searchParams.get("rowKey");
      const userName = searchParams.get("userName");
      const businessArea = searchParams.get("businessArea");

      let businessAreasUrl;
      let userUrl;
      const defaultBA = "CS Solutions- Business Area";

      if (!rowKey || !userName) {
        businessAreasUrl =
          `${API_BASE_URL}/Dashboard/business-areas?rowKey=THEOEXvz&userName=Santosh%20Dutta`
        // `${API_BASE_URL}/Dashboard/business-areas?rowKey=QXVolnBW&userName=Hariharan N&businessArea=CS Solutions- Business Area`
        //  `${API_BASE_URL}/Dashboard/business-areas?rowKey=QXVolnBW&userName=Hariharan N&businessArea=CS Solutions- Business Area`
        // `${API_BASE_URL}/Dashboard/business-areas?rowKey=THEOEXvz&userName=Santosh%20Dutta`;
        userUrl =
          `${API_BASE_URL}/Dashboard/load-user?rowKey=QXVolnBW&userName=Hariharan%20N&businessArea=CS%20Solutions-%20Business%20Area`;
      } else {
        businessAreasUrl = `${API_BASE_URL}/Dashboard/business-areas?rowKey=${rowKey}&userName=${encodeURIComponent(
          userName
        )}`;
      userUrl = !businessArea || businessArea === "Global-Dashboard"
  ? `${API_BASE_URL}/Dashboard/load-user?rowKey=${rowKey}&userName=${encodeURIComponent(userName)}&businessArea=${encodeURIComponent(defaultBA)}`
  : `${API_BASE_URL}/Dashboard/load-user?rowKey=${rowKey}&userName=${encodeURIComponent(userName)}&businessArea=${encodeURIComponent(businessArea)}`;

      }

      // ✅ Run both APIs in parallel
      const [businessAreasResponse, userResponse] = await Promise.all([
        axios.get(businessAreasUrl),
        axios.get(userUrl),
      ]);

      return {
        businessAreas: businessAreasResponse.data,
        user: userResponse.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dropDownDataSlice = createSlice({
  name: "dropdown",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(dropDownData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dropDownData.fulfilled, (state, action) => {
        state.data = action.payload; // contains both businessAreas + user
        state.loading = false;
      })
      .addCase(dropDownData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default dropDownDataSlice.reducer;