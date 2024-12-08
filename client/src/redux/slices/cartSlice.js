import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalitems: 0,
},
    reducers: {
        setCartList: (state, action) => {
            state.items = action.payload;
            state.totalitems = action.payload.length;
        },
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);

            if (!existingItem) {
                state.items.push(newItem)
            }
            state.totalitems += 1;
        },

        removeItemFromCart: (state, action) => {
            const bookId = action.payload;
            const existingItem = state.items.find(item => item._id === bookId);
            // need to check
            if (existingItem) {
                state.totalitems -= existingItem.quantity;
                state.items = state.items.filter(item => item._id !== bookId);
            }
        },

        clearCart: state => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const { setCartList, addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;