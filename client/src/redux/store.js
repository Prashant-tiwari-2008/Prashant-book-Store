import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer
})
