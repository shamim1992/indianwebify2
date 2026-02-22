import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import serviceReducer from './slices/serviceSlice';
import blogReducer from './slices/blogSlice';
import portfolioReducer from './slices/portfolioSlice';
import invoiceReducer from './slices/invoiceSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'], // only persist token and user
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        project: projectReducer,
        service: serviceReducer,
        blog: blogReducer,
        portfolio: portfolioReducer,
        invoice: invoiceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export default store;
