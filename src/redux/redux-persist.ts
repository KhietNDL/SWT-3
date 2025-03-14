// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // sử dụng localStorage
import userSlice from "./features/userSlice";
import orderReducer from "./features/orderSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Combine các reducer inline
const rootReducer = combineReducers({
  user: userSlice,
  order: orderReducer,
});

// Áp dụng redux-persist cho rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
