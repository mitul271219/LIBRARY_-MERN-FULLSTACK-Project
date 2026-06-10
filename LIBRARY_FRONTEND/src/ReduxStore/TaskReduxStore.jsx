


import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import library from "./LibrarySlice";

// combine reducers
const rootReducer = combineReducers({
    LibraryProject:library
});

// persist configuration
const persistConfig = {
    key: " mitul-task",
    storage,
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const rootStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// persistor
export const persistor = persistStore(rootStore);