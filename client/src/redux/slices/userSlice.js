import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: {},
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.currentUser = action.payload.data;
        },
        editUserDetails: (state, action) => {
            state.currentUser = action.payload.data;
        }
    }
})

export const {
    setUserDetails,
    editUserDetails
} = userSlice.actions;

export default userSlice.reducer;
