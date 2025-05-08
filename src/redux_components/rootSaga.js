import { all, put, takeLatest } from 'redux-saga/effects';
import { userSaga } from './entities/users/userSlice';
import { productSaga } from './entities/products/productSlice';
import { orderLineSaga, orderLineActions } from './entities/orderLines/orderLineEntity';
import { orderSaga, orderActions } from './entities/orders/orderEntity';

function* refetchOrderLines({ payload }) {
  yield put(orderLineActions.fetchRequest(payload.userId));
}

export default function* rootSaga() {
  yield all([userSaga(), productSaga(), orderLineSaga(), orderSaga(), 
    takeLatest(orderActions.addSuccess.type, refetchOrderLines)]);
}
