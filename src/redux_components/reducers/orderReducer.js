import { ADD_ORDER_TO_CART, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER } from "../actionTypes";


const initialState = {
  items: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_TO_CART:
    case ADD_ORDER:
      return {
        ...state,
        items: [...state.items, action.payload.order],
      };

    case UPDATE_ORDER:
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
      };

    case REMOVE_ORDER:
      return {
        ...state,
        items: state.items.filter((order) => order.id !== action.payload.orderId),
      };

    // case CLEAR_CART_ORDERS:
    //   return {
    //     ...state,
    //     items: state.items.filter(order => 
    //       !action.payload.includes(order.id)
    //     ),
    //   };

    default:
      return state;
  }
};
