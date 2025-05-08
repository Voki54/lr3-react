import { createEntity } from '../../shared/createEntity';
import * as api from './api';

const {
  slice,
  saga,
  actions,
  reducer,
  selectors,
} = createEntity({
  name: 'orders',
  fetchFn: api.fetchOrders,
  addFn: api.addOrder,
});

export const orderReducer = reducer;
export const orderSaga = saga;
export const orderActions = actions;
export const orderSelectors = selectors;
