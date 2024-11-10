import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: []
    },
    reducers: {
        setWishlist: (state, action) => {
            state.items = action.payload;
        },
        addItemToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id)

            if (!existingItem) {
                state.items.push(newItem)
            }
        },

        removeItemFromWishlist: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item._id !== id)
        }
    }
})

export const { setWishlist, addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;