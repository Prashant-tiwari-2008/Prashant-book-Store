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
            const existingItem = state.items.find(item => item.bookId._id === newItem._id);

            if (!existingItem) {
                state.items.push({ bookId: newItem, quantity: 1 })
            } else {
                existingItem.quantity += 1
            }
            state.totalitems += 1;
        },

        removeItemFromCart: (state, action) => {
            const bookId = action.payload;
            state.items = state.items.filter(item => item.bookId._id !== bookId);
        },

        reducerItemQuantity: (state, action) => {
            const bookId = action.payload;
            const existingItem = state.items.find(item => item.bookId._id === bookId);

            if (existingItem) {
                state.totalitems -= 1;
                existingItem.quantity -= 1;
            }
        },

        clearCart: state => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const { setCartList, addItemToCart, removeItemFromCart, reducerItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;