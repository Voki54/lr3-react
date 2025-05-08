import { all } from 'redux-saga/effects';
import { userSaga } from './entities/users/userSlice';
import { productSaga } from './entities/products/productSlice';
import { orderLineSaga } from './entities/orderLines/orderLineEntity';

export default function* rootSaga() {
  yield all([userSaga(), productSaga(), orderLineSaga()]);
}
