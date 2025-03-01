
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from "../../config";


const initialState = {
    loading: false,
    user: null,
    uid: null,
    error: null,
};

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData) => {
        try {
            const response = await axios.post(URL + `auth/signup`, userData);
            if (response.data.user === true && response.data.data !== null) {
                return response.data.data;
            }
        } catch (error) {
            return error.response?.data;
        }
    }
);


export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (userData) => {
        try {
            const response = await axios.post(URL + `auth/signin`, userData, { withCredentials: true });
            if (response.data.authenticate === true && response.data.user && response.data.session) {
                return response.data.user;
            }
            if (response.data.user === false) return response.data
        } catch (error) {
            return error.response?.data;
        }
    }
);


export const logOutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        try {
            const response = await axios.post(URL + `auth/logout`, {}, { withCredentials: true })
            return response.data
        }
        catch (error) {
            return error.response?.message
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        AddUserId: (state, action) => {
            state.uid = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logOutUser.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    },
});

// Export the reducer
export const authReducer = authSlice.reducer;
