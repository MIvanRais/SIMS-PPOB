import { configureStore } from '@reduxjs/toolkit';
import login from '../features/auth/login-slice';
import profile from '../features/manage-profile/profile-slice';
import transaction from '../features/transaction/transaction-slice';
import services from '../features/services/service-slice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'session',
    version: 1,
    storage,
}
const persistConfigProfile = {
    key: 'profile',
    version: 1,
    storage,
};
const persistTransaction = {
    key: 'transaction',
    version: 1,
    storage,
};
const persistServices = {
    key: 'services',
    version: 1,
    storage,
};

const persistedLogin = persistReducer(persistConfig, login);
const persistedProfile = persistReducer(persistConfigProfile, profile);
const persistedTransaction = persistReducer(persistTransaction, transaction);
const persistedServices = persistReducer(persistServices, services);

export const store = configureStore({
    reducer: {
        login: persistedLogin,
        profile: persistedProfile,
        transaction: persistedTransaction,
        services: persistedServices
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);