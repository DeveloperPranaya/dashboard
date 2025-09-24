// // fetchWidgetData.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;
// const initialState = {
//   widgets: {},   // each layout will be stored here
// };

// export const fetchWidgetData = createAsyncThunk(
//   "dashboard/fetchWidgetData",
//   async ({ business_area, layout }, thunkAPI) => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const urlBusinessArea = searchParams.get("businessArea");
//     const finalBusinessArea = business_area || urlBusinessArea;

//     try {
//       const url = `${API_BASE_URL}/Dashboard/${encodeURIComponent(finalBusinessArea)}/${encodeURIComponent(layout)}`;

//       const response = await axios.get(url);

//       return { layout, data: response.data }; // store layout with data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const fetchWidgetDataSlice = createSlice({
//   name: "widgetData",
//   initialState: {
//     widgets: {},   // { WG013: {...}, WG007: {...}, ... }
//     loading: false,
//     error: null,
//   },
//  reducers: {
//     resetWidgets: () => initialState,  // 🔥 clear widgets on dropdown change
//   },
// // reducers: {
// //     resetWidgets: (state) => {
// //       state.widgets = {};   // ✅ clears out all old widgets immediately
// //     },
// //   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWidgetData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWidgetData.fulfilled, (state, action) => {
//         state.loading = false;
//         const { layout, data } = action.payload;
//         state.widgets[layout] = data; // save by layout key
//       })
//       .addCase(fetchWidgetData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
      
//   },
// });

// export const { resetWidgets } = fetchWidgetDataSlice.actions;
// export default fetchWidgetDataSlice.reducer;


// fetchWidgetData.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;
const initialState = {
  widgets: {},
  loading: false,
  error: null,
};

// Keep a reference to cancel tokens for each layout
let cancelTokens = {};

export const fetchWidgetData = createAsyncThunk(
  "dashboard/fetchWidgetData",
  async ({ business_area, layout }, thunkAPI) => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlBusinessArea = searchParams.get("businessArea");
    const finalBusinessArea = business_area || urlBusinessArea;

    try {
      // Cancel any previous request for this layout
      if (cancelTokens[layout]) {
        cancelTokens[layout].cancel("Cancelled due to new request");
      }

      // Create new cancel token
      cancelTokens[layout] = axios.CancelToken.source();

      const url = `${API_BASE_URL}/Dashboard/${encodeURIComponent(
        finalBusinessArea
      )}/${encodeURIComponent(layout)}`;

      const response = await axios.get(url, {
        cancelToken: cancelTokens[layout].token,
      });

      return { layout, data: response.data };
    } catch (error) {
      if (axios.isCancel(error)) {
        // If cancelled, just exit silently
        return thunkAPI.rejectWithValue("Request cancelled");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const fetchWidgetDataSlice = createSlice({
  name: "widgetData",
  initialState,
  reducers: {
    resetWidgets: () => {
  Object.values(cancelTokens).forEach((token) => token.cancel("Reset triggered"));
  cancelTokens = {};
  return initialState;
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgetData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWidgetData.fulfilled, (state, action) => {
        state.loading = false;
        const { layout, data } = action.payload;
        state.widgets[layout] = data;
      })
      .addCase(fetchWidgetData.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Request cancelled") {
          state.error = action.payload;
        }
      });
  },
});

export const { resetWidgets } = fetchWidgetDataSlice.actions;
export default fetchWidgetDataSlice.reducer;

