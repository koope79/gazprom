import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/productsSlice';

const appReducer = combineReducers({
  products: productsSlice.reducer,
});

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
