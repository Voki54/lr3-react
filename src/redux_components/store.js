import { productReducer } from "./reducers/productReducer";
import { combineReducers } from "./combineReducers";
import { orderReducer } from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";


export const createStore = (rootReducer) => {
  let state = rootReducer(undefined, {});
  const listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) listeners.splice(index, 1);
      };
    },
  };
};

const rootReducer = combineReducers({
  products: productReducer,
  orders: orderReducer,
  cart: cartReducer,
  user: userReducer,
  // user, orders и т.д. — добавишь по мере реализации
});

export const store = createStore(rootReducer);
