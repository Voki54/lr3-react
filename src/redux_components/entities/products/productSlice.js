import { createEntity } from '../../shared/createEntity';
import { fetchProducts } from './api';

export const {
  slice: productSlice,
  saga: productSaga,
  actions: productActions,
  reducer: productReducer,
} = createEntity({ name: 'products', fetchFn: fetchProducts });
