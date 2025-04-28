import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./users/userSlice";
import productReducer from "./products/productSlice";
import cartReducer from "./carts/cartSlice";
import orderReducer from "./orders/orderSlice";
import orderLineReducer from "./orders/orderLineSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orderLines: orderLineReducer,
    orders: orderReducer,
  },
});

export default store;
