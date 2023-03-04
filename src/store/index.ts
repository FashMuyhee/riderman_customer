import { configureStore, combineReducers, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { deliveryApi } from '@services/rtk-queries/deliveries';
import { riderApi } from '@services/rtk-queries/rider';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [riderApi.reducerPath]: riderApi.reducer,
      [deliveryApi.reducerPath]: deliveryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(riderApi.middleware, deliveryApi.middleware),
    ...options
  });

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;