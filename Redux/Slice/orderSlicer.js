import { URL } from "../../config";  // Adjust path based on your file structure
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RemoveFromCart } from "./cartSlicer";

export const PlaceOrder = createAsyncThunk(
    'order/placeorder', async (data) => {
        try {
            const response = await axios.post(URL + `order/placeorder`, data);
            if (response.data && response.data.order === true) return response.data.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const GetUserOrder = createAsyncThunk(
    'order/getuserorder', async (id) => {
        try {
            const response = await axios.get(URL + `order/getorder/${id}`);
            if (response.data && response.data.success === true) return response.data.data;
        } catch (error) {
            return error.response.data;
        }
    }
);

export const GetOrderById = createAsyncThunk(
    'order/getsingleorder', async (id) => {
        try {
            const response = await axios.get(URL + `order/getsingleorder/${id}`);
            if (response.data && response.data.success === true) return response.data.data;
        } catch (error) {
            return error.response.data;
        }
    }
);


const initialState = {
    orderItems: [],
    loading: false,
    error: null,
    singleOrder: null
};

// Order slice
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PlaceOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PlaceOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = [...state.orderItems, action.payload];
                console.log(action.payload)
            })
            .addCase(PlaceOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetUserOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderItems = action.payload;
            })
            .addCase(GetUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetOrderById.fulfilled, (state, action) => {
                state.singleOrder = action.payload;
                state.loading = false;
            });
    }
});

// Export the reducer
export const orderReducer = orderSlice.reducer;


