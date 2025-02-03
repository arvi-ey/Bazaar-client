import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from "../../config";


// Async thunk for getting all categories
export const GetAllCategory = createAsyncThunk('getCategory', async () => {
    try {
        const response = await axios.get(URL + `category/getallcategory`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get categories");
    }
});

// Async thunk for adding a new category
export const AddCategory = createAsyncThunk(
    'addcategory',
    async (data) => {
        try {
            const response = await axios.post(URL + `category/addcategory`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to add categories");
        }
    }
);

// Async thunk for updating a category
export const UpdateCategory = createAsyncThunk(
    'updatecategory',
    async ({ data, id }) => {
        try {
            const response = await axios.patch(URL + `category/updatecategory/${id}`, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to Update Category");
        }
    }
);

// Async thunk for deleting a category
export const DeleteCategory = createAsyncThunk(
    'deletecategory', async (id) => {
        try {
            const response = await axios.delete(URL + `category/updatecategory/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response?.data?.message || "Failed to delete category");
        }
    }
);

// Async thunk for getting products by category
export const GetProductsByCategory = createAsyncThunk('category/getproducts', async (data) => {
    try {
        const response = await axios.get(URL + `products/getproductcategory/${data}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
});

// Category slice
export const categorySlice = createSlice({
    name: "category",
    initialState: {
        loading: false,
        category: [], // Array of categories
        productByCategory: [], // Array of products for a category
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(GetAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = [...state.category, action.payload.data];
            })
            .addCase(AddCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = state.category.map(category =>
                    category._id === action.payload.data._id ? action.payload.data : category
                );
            })
            .addCase(UpdateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = state.category.filter(data => data._id !== action.payload.data._id);
            })
            .addCase(DeleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.productByCategory = action.payload;
            })
            .addCase(GetProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export category reducer
export const CategoryReducer = categorySlice.reducer;
