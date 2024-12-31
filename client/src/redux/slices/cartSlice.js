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
            debugger
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.bookId._id === newItem._id);

            if (!existingItem) {
                state.items.push({ bookId: newItem, quantity: 1 })
            } else {
                existingItem.quantity += 1
            }
            state.totalitems += 1;
        },

        //todo : check funcanality 
        removeItemFromCart: (state, action) => {
            const bookId = action.payload;
            const existingItem = state.items.find(item => item._id === bookId);
            if (existingItem) {
                state.totalitems -= existingItem.quantity;
                existingItem.quantity -= 1;
                state.items = state.items.filter(item => item._id !== bookId);
            } else {

            }
        },

        // todo : need to check 
        // updateItemQuantity: (state, action) => {
        //     const { bookId, quantity } = action.payload; // Book ID and new quantity

        //     const existingItem = state.items.find(item => item.bookId === bookId);

        //     if (existingItem) {
        //         // Adjust total items count
        //         state.totalItems += quantity - existingItem.quantity;

        //         // Update the item's quantity
        //         existingItem.quantity = quantity;
        //     }
        // },

        clearCart: state => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const { setCartList, addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;