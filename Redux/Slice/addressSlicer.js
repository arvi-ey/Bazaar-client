import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from "../../config";

// Async thunk for adding an address
export const AddAddress = createAsyncThunk(
    'address/addaddress',
    async (data) => {
        try {
            // console.log(data);
            const response = await axios.post(URL + 'address/addaddress', data);
            if (response.data.success === true) {
                return response.data.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);

// Async thunk for getting an address
export const GetAddress = createAsyncThunk(
    'address/getAddress',
    async (id) => {
        try {
            const response = await axios.get(URL + `address/getuseraddress/${id}`);
            if (response.data.success === true) {
                return response.data.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);

// Async thunk for deleting an address
export const DeleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (id) => {
        try {
            const response = await axios.delete(URL + `address/updateuseraddress/${id}`, { withCredentials: true });
            if (response.data.success === true) {
                return response.data.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);

// Async thunk for updating an address
export const UpdateAddress = createAsyncThunk(
    'address/updateAddress',
    async (value) => {
        try {
            const response = await axios.patch(URL + `address/updateuseraddress/${value.id}`, value.data);
            if (response.data.success === true) {
                console.log(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
);

// Address slice
export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: [],
        currentOrderAddress: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = [...state.address, action.payload];
                state.currentOrderAddress = action.payload
            })
            .addCase(AddAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GetAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = action.payload;
            })
            .addCase(GetAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DeleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.address = state.address.filter(data => data._id !== action.payload._id);
            })
            .addCase(DeleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateAddress.fulfilled, (state, action) => {
                state.loading = false;
                const updatedData = action.payload;
                state.address = state.address.map(data => data._id === updatedData._id ? updatedData : data);
            })
            .addCase(UpdateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Export address reducer
export const addressReducer = addressSlice.reducer;



// {
//     "name": "Tuhin Roy",
//         "phone": 6290450030,
//             "userId": "67c301006fa8c011473aa584",
//                 "street": "Angless nagar",
//                     "city": "Kolkata",
//                         "state": "West Bengal",
//                             "pinCode": "700114",
//                                 "addressType": "OFFICE",
//                                     "isDefault": false,
//                                         "_id": "67dfb4516a6b97fd107cd94e",
//                                             "__v": 0
// }