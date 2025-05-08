import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from './entities/users/userSlice';
import { productReducer } from './entities/products/productSlice';
import { orderLineReducer } from './entities/orderLines/orderLineEntity';
import { orderReducer } from './entities/orders/orderEntity';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    orderLine: orderLineReducer,
    orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
