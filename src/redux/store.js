import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import notesReducer from './noteSlice';
import bookMarkReducer from './bookmarkSlice';
import dropDownReducer from "./dropdownSlice";
import dashboardDataReducer from "./fetchWidgetDataSlice"


const store = configureStore({
  reducer: {
    dashboardfetchData: dashboardDataReducer,
    dashboard: dashboardReducer,
    notes: notesReducer,
    bookMark:bookMarkReducer,
    dropDown:dropDownReducer
  },
});

export default store;
