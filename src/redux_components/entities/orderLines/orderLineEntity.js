import { createEntity } from '../../shared/createEntity';
import * as api from './api';

const {
  slice,
  saga,
  actions,
  reducer,
  selectors,
} = createEntity({
  name: 'orderLine',
  fetchFn: api.fetchOrderLines,
  addFn: api.addOrderLine,
  updateFn: api.updateOrderLine,
  deleteFn: api.deleteOrderLine,
});

export const orderLineReducer = reducer;
export const orderLineSaga = saga;
export const orderLineActions = actions;
export const orderLineSelectors = selectors;
