import { ADD_CART, ADD_ORDER_TO_CART, REGISTER, REMOVE_ORDER  } from "../actionTypes" //, UPDATE_CART_ORDER, REMOVE_ORDER_FROM_CART, CLEAR_CART_ORDERS
import { createCart } from "../models/cart";

const initialState = {
    items: [
        {
            id: 1,
            userId: 2, 
            orders: [],
        },
        {
            id: 2,
            userId: 3, 
            orders: [], 
        }
    ],
}
  
  export const cartReducer = (state = initialState, action) => {
    // const { cartId } = action.payload;
    switch (action.type) {
      case REGISTER:
      case ADD_CART:
        const newCart = createCart({
          id: Date.now,
          userId: action.payload.id, //TODO !!!!
          orders: []
        })

        return {
          ...state,
          items: [...state.items, newCart],
        };
  
      case ADD_ORDER_TO_CART:
        const { cartId, order } = action.payload;
        return {
            ...state,
            items: state.items.map((cart) => {
                if (cart.id !== cartId) return cart;
        
                return {
                ...cart,
                orders: [...cart.orders, order.id],
                };
            }),
        };
  
      case REMOVE_ORDER:
        const { cartId: removeCartId, orderId } = action.payload;

        return {
          ...state,
          items: state.items.map((cart) => {
            if (cart.id !== removeCartId) return cart;
      
            return {
              ...cart,
              orders: cart.orders.filter((id) => id !== orderId),
            };
          }),
        };
      // case UPDATE_CART_ORDER:
      //   return {
          
      //   };
  
      // case REMOVE_ORDER_FROM_CART:
      //   return {
      //     ...state,
      //     orders: state.orders.filter((order) => order.id !== action.payload),
      //   };
  
      // case CLEAR_CART_ORDERS:
      //   return {
      //     ...state,
      //     orders: [],
      //   };
  
      default:
        return state;
    }
  };
  