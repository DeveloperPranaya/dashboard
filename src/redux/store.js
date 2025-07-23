import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import notesReducer from './noteSlice';
import bookMarkReducer from './bookmarkSlice'


const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    notes: notesReducer,
    bookMark:bookMarkReducer,
  },
});

export default store;
