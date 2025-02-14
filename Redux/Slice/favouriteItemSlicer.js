import { createSlice } from "@reduxjs/toolkit"

const saveFavoritesToStorage = (favorites) => {
    try {
        localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
    }
};

export const favouriteProductSlice = createSlice({
    name: "favourite",
    initialState: {
        items: [],
        error: null,
    },
    reducers: {
        updateFavouriteItem: (state, action) => {
            const exists = state.items.find(item => item._id === action.payload._id);
            if (!exists) {
                state.items.push(action.payload);
                saveFavoritesToStorage(state.items);
            }
            if (exists) {
                state.items = state.items.filter(item => item._id !== action.payload._id);
                saveFavoritesToStorage(state.items);
            }
        },
        getfavouriteItem: (state) => {
            try {
                const storedFavorites = localStorage.getItem('favoriteProducts');
                state.items = storedFavorites ? JSON.parse(storedFavorites) : [];
            } catch (error) {
                console.error('Error loading favorites from localStorage:', error);
            }
        },
    }
})
export const { updateFavouriteItem, getfavouriteItem } = favouriteProductSlice.actions;
export default favouriteProductSlice.reducer;