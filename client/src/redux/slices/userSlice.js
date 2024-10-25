import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: {
        name: "Prashant tiwari",
        email: "prashanttiwari.vns@gamil.com"
    },
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
        // need to add
        // update user => for admin
        // delete user => for admin
    }
})

export const {
    signInSuccess,
    signInFailure,
    signOutSuccess
} = userSlice.actions;

export default userSlice.reducer