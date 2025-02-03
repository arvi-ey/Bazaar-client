import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { URL } from "../../config";
import axios from 'axios';

// Async thunk to get users
export const GetUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        try {
            const response = await axios.get(URL + `user/getallUser`, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Get user Failed");
        }
    }
);

// Users slice
export const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(GetUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export the users reducer
export const usersReducer = userSlice.reducer;
