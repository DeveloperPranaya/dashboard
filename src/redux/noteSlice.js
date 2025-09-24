import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = window._env_.REACT_APP_API_BASE_URL;

export const addNote = createAsyncThunk(
    'notes/addNote',
    async (payload, thunkAPI) => {
       
        try {
            const res = await axios.post(`${API_BASE_URL}/Dashboard/add-note`, payload)
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

//Get:fetch Notes

export const fetchNotesData = createAsyncThunk(
    "notes/fetchNotesData",
    async ({ contractId }, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/Dashboard/get-usernote?contractId=${contractId}`)
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }

    }
);

//Delete: Delete Notes


export const deleteNotes = createAsyncThunk(
    "notes/deleteNotes",
    async ({ contractId, rowKey }, thunkAPI) => {
        try {
            const res = await axios.delete(
                `${API_BASE_URL}/Dashboard/delete-usernote?contractId=${contractId}&rowKey=${rowKey}`,
                {
                    params: { contractId, rowKey }
                });
            return { contractId, result: res.data };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }

    }
);


const noteSlice = createSlice({
    name: 'notes',
    initialState: { response: null, loading: false, error: null },
    extraReducers: builder => {
        builder
            .addCase(addNote.pending, state => { state.loading = true; state.error = null })
            .addCase(fetchNotesData.pending, state => { state.loading = true; state.error = null })
            .addCase(deleteNotes.pending, state => { state.loading = true; state.error = null })
            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload;
            })
            .addCase(fetchNotesData.fulfilled, (state, action) => {
                state.loading = false;
                state.bookMarks = action.payload;
            })
            .addCase(addNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNotes.fulfilled, (state, action) => {
                state.loading = false;
                const { contractId } = action.payload;
                state.bookMarks = state.bookMarks.filter(
                    b => b.contractId !== contractId
                );
            })
            .addCase(fetchNotesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },

});

export default noteSlice.reducer;

