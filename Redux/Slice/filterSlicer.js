import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    size: null,
    pricerange: null,
    rating: null,
}


export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        AddSize: (state, action) => {
            state.size = action.payload
        },
        AddPriceRange: (state, action) => {
            state.pricerange = action.payload
        },
        AddRating: (state, action) => {
            state.rating = action.rating
        }

    }
})

export const filterReducer = filterSlice.reducer
export const { AddRating, AddSize, AddPriceRange } = filterSlice.actions