import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../redux_components/entities/orders/orderEntity';

function Orders() {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user.user);
  const { data: orders = [], loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(orderActions.fetchRequest(authUser.id)); // Загружаем заказы для текущего пользователя
    }
  }, [dispatch, authUser?.id]);

  // Рассчитываем сумму заказа
  function orderAmount(orderItems) {
    return orderItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    ) || 0;
  }

  if (loading) return <div>Загружаем заказы...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Заказы</h2>
      {orders.length === 0 ? (
        <p>Заказов нет.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Дата заказа: {order.orderDate}</p>
              <p>Дата доставки: {order.deliveryDate}</p>
              <ul>
                {order.items.map((orderLine) => (
                  <li key={orderLine.id}>
                    <p>{orderLine.product.name}</p>
                    <p>{orderLine.product.price}₽, {orderLine.count} шт. = {orderLine.product.price * orderLine.count}₽</p>
                  </li>
                ))}
              </ul>
              <h4>Сумма заказа: {orderAmount(order.items)}₽</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
