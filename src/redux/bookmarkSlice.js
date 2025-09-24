import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

//post:add a bookmark
export const addBookMark = createAsyncThunk(
    'bookMark/addBookMark',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/Dashboard/add-bookmark`, payload)
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

//Get:fetch all bookmark

export const fetchBookMark = createAsyncThunk(
    "bookMark/fetchBookMark",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/Dashboard/get-bookmarks`)
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }

    }
);

//Delete: Delete bookMark


export const deleteBookMark = createAsyncThunk(
    "bookMark/deleteBookMark",
    async ({ contractId, userId }, thunkAPI) => {
        try {
            const res = await axios.delete(
                `${API_BASE_URL}/dashboard/delete-bookmark?contractId=${contractId}&userId=${userId}`,
                {
                    params: { contractId, userId }
                });
            return { contractId, result: res.data };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }

    }
);

const bookMarkSlice = createSlice({
    name: "bookMark",
    initialState: { bookMarks: [], response: null, loading: false, error: null },
    extraReducers: builder => {
        builder
            .addCase(addBookMark.pending, state => { state.loading = true; state.error = null })
            .addCase(fetchBookMark.pending, state => { state.loading = true; state.error = null })
            .addCase(deleteBookMark.pending, state => { state.loading = true; state.error = null })
            .addCase(addBookMark.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload;
            })
            .addCase(fetchBookMark.fulfilled, (state, action) => {
                state.loading = false;
                state.bookMarks = action.payload;
            })
            .addCase(deleteBookMark.fulfilled, (state, action) => {
                state.loading = false;
                const { contractId } = action.payload;
                state.bookMarks = state.bookMarks.filter(
                    b => b.contractId !== contractId
                );
            })
            .addCase(fetchBookMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBookMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBookMark.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default bookMarkSlice.reducer;