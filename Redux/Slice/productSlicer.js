import { URL } from "../../config";  // Adjust path based on your file structure
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

// GetSingleProduct async thunk
export const GetSingleProduct = createAsyncThunk(
    'getSingleProduct', async (id) => {
        try {
            const response = await axios.get(URL + `products/getproduct/${id}`, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Get single product failed");
        }
    }
);

// Initial state for the single product slice
const initialState = {
    loading: false,
    product: null, // product can be null
    error: null, // error can also be null
};

// Single product slice
export const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null;
            })
            .addCase(GetSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(GetSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

// Export the reducer
export const SinngleProductReducer = singleProductSlice.reducer;
