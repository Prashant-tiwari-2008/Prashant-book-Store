import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/WishListSlice'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
})

export const store = configureStore({
    reducer: rootReducer
})
