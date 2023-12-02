import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer, // Corrected to use the userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
