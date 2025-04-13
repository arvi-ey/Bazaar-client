import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from 'axios';
import { URL } from "../../config";
import { PlaceOrder } from "./orderSlicer";

// Async thunk to get all products
export const GetAllProducts = createAsyncThunk('getallproducts', async () => {
    try {
        const response = await axios.get(URL + `products/getallproducts`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
});

// Async thunk to get products with pagination and sorting
export const GetProducts = createAsyncThunk('getproducts', async (data) => {
    const { page, limit, dsc, category } = data;
    try {
        const response = await axios.get(URL + `products/getproducts?page=${page}&limit=${limit}&sort=${dsc}&category=${category}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
});

export const GetFilteredProducts = createAsyncThunk('getFilteredproducts', async (price) => {
    try {
        const response = await axios.get(URL + `products/filteredProduct?price=${price}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to get products");
    }
});

export const GetHomeProducts = createAsyncThunk('gethomeproducts', async (limit) => {
    try {
        const response = await axios.get(URL + `products/gethomeproducts?limit=${limit}`)
        if (response.data.status == "successfull") {
            return response.data.data;
        }
    }
    catch (error) {
        return error.response.data;
    }
})

// Async thunk to add a new product
export const AddProduct = createAsyncThunk('addproduct', async (data) => {
    try {
        const response = await axios.post(URL + `products/addproduct`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to add categories");
    }
});

// Async thunk to update a product
export const UpdateProductData = createAsyncThunk('updateddbanner', async ({ data, id }) => {
    try {
        const response = await axios.patch(URL + `products/updateproduct/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to Update Product");
    }
});

// Async thunk to delete a product
export const DeleteProduct = createAsyncThunk('deleteproduct', async (id) => {
    try {
        const response = await axios.delete(URL + `products/updateproduct/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response?.data?.message || "Failed to Delete Product");
    }
});

// Async thunk to get products by category
export const GetProductsByCategory = createAsyncThunk('products/getproductsbycategory', async (category) => {
    try {
        const response = await axios.get(URL + `products/getproductcategory/${category}`);
        if (response.data.success === true) {
            return response.data.data;
        }
    } catch (error) {
        return error.response.data;
    }
});

// Product slice
export const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        scrollLoading: false,
        products: [],
        categoryProducts: [],
        homeProducts: [],
        error: null,
        hasMore: true,
        allProducts: [],
        filteredProducts: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                // state.products = action.payload;
                state.allProducts = action.payload;
            })
            .addCase(GetAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetProducts.pending, (state) => {
                if (state.products.length < 1) {
                    state.loading = true;
                }
                if (state.products.length > 0) {
                    state.scrollLoading = true;
                }
                state.error = null;
            })
            .addCase(GetProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.scrollLoading = false;
                if (action.payload.data.length === 0) {
                    state.hasMore = false;
                } else {
                    state.products = [...state.products, ...action.payload.data];
                }
            })
            .addCase(GetProducts.rejected, (state, action) => {
                state.scrollLoading = true;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = [...state.products, action.payload.data];
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateProductData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) => product._id === action.payload.data._id ? action.payload.data : product);
            })
            .addCase(UpdateProductData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((product) => product._id !== action.payload.data._id);
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(PlaceOrder.fulfilled, (state, action) => {
                const { productId, quantity } = action.payload;
                const data = state.products.filter(data => data._id === productId);
                state.products = state.products.map((data) =>
                    data._id == productId
                        ? { ...data, stock: data.stock ? (data.stock - quantity) : 0 }
                        : data
                );
            })
            .addCase(GetProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.categoryProducts = [];
            })
            .addCase(GetProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryProducts = action.payload;
            })
            .addCase(GetProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetHomeProducts.pending, (state, action) => {
                state.loading = true
                state.homeProducts = []
            })
            .addCase(GetHomeProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.homeProducts = action.payload
            })
            .addCase(GetHomeProducts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            .addCase(GetFilteredProducts.pending, (state, action) => {
                state.loading = true,
                    state.error = null
                state.filteredProducts = []
            })
            .addCase(GetFilteredProducts.fulfilled, (state, action) => {
                // state.products = [],
                state.loading = false
                state.filteredProducts = action.payload.data

            })
    }
});

// Export product reducer
export const ProductRedducer = productSlice.reducer;
