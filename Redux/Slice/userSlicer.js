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


export const UpdateUser = createAsyncThunk(
    'user/upateuser',
    async (userId, reqBody) => {
        try {
            const response = await axios.patch(URL + `user/updateuser/${userId}`)
            if (response.data.success == true) return response.data.data
        }
        catch (error) {
            return error.response.data
        }
    }
)

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
            })
            .addCase(UpdateUser.pending, (state, action) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload }
                state.loading = false
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
});

// Export the user reducer
export const userReducer = userSlice.reducer;
