import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from "../../config";

// Async thunk for getting all banners
export const GetBanners = createAsyncThunk(
    'getbanners',
    async () => {
        try {
            const response = await axios.get(URL + `banner/allbanners`, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Get banner Failed");
        }
    }
);

// Async thunk for adding a new banner
export const AddBanner = createAsyncThunk(
    'addbanner',
    async (data) => {
        try {
            const response = await axios.post(URL + `banner/addbanner`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add Banner");
        }
    }
);

// Async thunk for updating a banner
export const UpdateBanner = createAsyncThunk(
    'updateddbanner',
    async ({ data, id }) => {
        try {
            const response = await axios.patch(URL + `banner/updatebanner/${id}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Update Banner");
        }
    }
);

// Async thunk for deleting a banner
export const DeleteBanner = createAsyncThunk(
    'deletebanner',
    async (id) => {
        try {
            const response = await axios.delete(URL + `banner/updatebanner/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to delete banner");
        }
    }
);

// Banner slice
export const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        loading: false,
        banner: [], // Array of banners
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = action.payload;
            })
            .addCase(GetBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = [...state.banner, action.payload.data];
            })
            .addCase(AddBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateBanner.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBanner = action.payload.data;
                state.banner = state.banner.map((banner) =>
                    banner._id === updatedBanner._id ? updatedBanner : banner
                );
            })
            .addCase(UpdateBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.banner = state.banner.filter(banner => banner._id !== action.payload.data._id);
            })
            .addCase(DeleteBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export banner reducer
export const bannerReducer = bannerSlice.reducer;
