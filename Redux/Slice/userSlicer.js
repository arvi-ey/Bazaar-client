import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { URL } from "../../config";
import axios from 'axios';

// Async thunk to get user info
export const GetUserInfo = createAsyncThunk(
    'user/getUser',
    async (userId) => {
        try {
            const response = await axios.get(URL + `user/getUser/${userId}`, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Get user Failed");
        }
    }
);

// User slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null, // This would now be either an object or null
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // No need for type casting in JS
            })
            .addCase(GetUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export the user reducer
export const userReducer = userSlice.reducer;
