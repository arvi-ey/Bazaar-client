import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Slice/authSlicer';
import { userReducer } from '../Slice/userSlicer';
import { usersReducer } from '../Slice/usersSlicer';
import { bannerReducer } from '../Slice/bannerSlicer';
import { CategoryReducer } from '../Slice/categorySlicer';
import { ProductRedducer } from '../Slice/productsSlicer';
import { SinngleProductReducer } from '../Slice/productSlicer';
import { cartRducer } from "../Slice/cartSlicer";
import { addressReducer } from "../Slice/addressSlicer";
import { orderReducer } from "../Slice/orderSlicer";
import recentViewSlice from '../Slice/recentlyView';
import favouriteProductSlice from '../Slice/favouriteItemSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
        banner: bannerReducer,
        category: CategoryReducer,
        product: ProductRedducer,
        singleproduct: SinngleProductReducer,
        cart: cartRducer,
        address: addressReducer,
        order: orderReducer,
        favouriteproducts: favouriteProductSlice,
        recentView: recentViewSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Types for the Redux store state and dispatch (optional, for TypeScript users)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
