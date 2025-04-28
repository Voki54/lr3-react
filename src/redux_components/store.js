import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './users/userApi'
import { orderLineApi } from './orders/orderLineApi';
import { productsApi } from './products/productsApi'
import { orderApi } from './orders/orderApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [orderLineApi.reducerPath]: orderLineApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware, productsApi.middleware, orderApi.middleware, orderLineApi.middleware),
});

export default store;
