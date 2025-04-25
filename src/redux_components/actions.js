import  * as actionTypes  from "../redux_components/actionTypes";

export const addProduct = (product) => ({
  type: actionTypes.ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: actionTypes.REMOVE_PRODUCT,
  payload: productId,
});

export const updateProduct = (product) => ({
  type: actionTypes.UPDATE_PRODUCT,
  payload: product,
});

export const addOrder = (order) => ({
  type: actionTypes.ADD_ORDER,
  payload: order,
});

export const removeOrder = (orderDto) => ({
  type: actionTypes.REMOVE_ORDER,
  payload: orderDto,
});

export const updateOrder = (order) => ({
  type: actionTypes.UPDATE_ORDER,
  payload: order,
});


// export const setCart = (cart) => ({
//   type: "SET_CART",
//   payload: cart,
// });

export const addOrderToCart = (orderDto) => ({
  type: actionTypes.ADD_ORDER_TO_CART,
  payload: orderDto,
});

// export const login = (user) => ({
//   type: actionTypes.LOGIN,
//   payload: user,
// });

export const register = (user) => ({
  type: actionTypes.REGISTER,
  payload: user,
});

export const addCart = (userId) => ({
  type: actionTypes.ADD_CART,
  payload: userId,
});

// export const updateCartOrder = (order) => ({
//   type: actionTypes.UPDATE_CART_ORDER,
//   payload: order,
// });

// export const removeOrderFromCart = (orderId) => ({
//   type: actionTypes.REMOVE_ORDER_FROM_CART,
//   payload: orderId,
// });

// export const clearCartOrders = (cartOrdersIds) => ({
//   type: actionTypes.CLEAR_CART_ORDERS,
//   payload: cartOrdersIds,
// });
