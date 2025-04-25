import { useEffect, useState } from "react";
import { store } from "../redux_components/store";
import { useAuth } from "../account/AuthContext";
import {
//   addOrderToCart,  updateCartOrder,  removeOrderFromCart,  clearCartOrders,
  updateOrder,
  removeOrder,
} from "../redux_components/actions";


export default function Cart() {
  const [state, setState] = useState(store.getState());
  const { user } = useAuth();
  const userId = user?.id;

  const currentCart = state.cart.items.find((cart) => cart.userId === userId);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return unsubscribe;
  }, []);


  const handleRemove = (id) => {
    const orderDto = {
      cartId: currentCart.id,
      orderId: id
    }

    store.dispatch(removeOrder(orderDto));
  };

  const handleChangeQuantity = (order, delta) => {
    const newQuantity = order.quantity + delta;
    if (newQuantity < 1) return;
  
    const updatedOrder = {
      ...order,
      quantity: newQuantity,
    };
  
    store.dispatch(updateOrder(updatedOrder));
  };

  // const handleClear = (cartOrdersIds) => {
  //   store.dispatch(clearCartOrders(cartOrdersIds));
  // };

  const cartOrders = !currentCart || !currentCart.orders || currentCart.orders.length === 0 ? [] :
    currentCart.orders
      .map(orderId => state.orders.items.find(order => order.id === orderId))
      .filter(Boolean); // убираем возможные undefined, если заказ не найден

    const total = cartOrders?.reduce(
        (sum, order) => sum + order.product.price * order.quantity,
        0
    ) || 0;


  return (
    <div>
      <h2>Корзина</h2>
      {console.log(currentCart.orders)}
      {console.log(1)}
      {console.log(cartOrders)}
      {cartOrders.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
            <ul>
                {cartOrders.map((order) => (
                <li key={order.id}>
                    <strong>{order.product.title}</strong> — {order.product.price}₽, {order.quantity} шт. = {order.product.price * order.quantity}₽
                    <br />
                    <button onClick={() => handleChangeQuantity(order, 1)}>+</button>
                    <button onClick={() => handleChangeQuantity(order, -1)} disabled={order.quantity <= 1}>-</button>
                    <button onClick={() => handleRemove(order.id)}>Удалить из корзины</button>
                </li>
                ))}
            </ul>
            <h3>Итого: {total}₽</h3>
            {/* <button onClick={handleClear(currentCart.orders)}>Очистить корзину</button> */}
        </>
      )}
    </div>
  );
};

