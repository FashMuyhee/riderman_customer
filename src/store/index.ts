import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import {deliveryApi} from '@services/rtk-queries/deliveries';
import {paymentApi} from '@services/rtk-queries/payments';
import {walletApi} from '@services/rtk-queries/wallet';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: {
      [deliveryApi.reducerPath]: deliveryApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [walletApi.reducerPath]: walletApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        deliveryApi.middleware,
        paymentApi.middleware,
        walletApi.middleware,
      ),
    ...options,
  });

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
