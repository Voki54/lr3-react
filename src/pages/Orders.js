import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux_components/orders/orderThunk';
import { useAuth } from '../account/AuthContext';

function Oreders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchOrders(authUser.id));
    }
  }, [authUser, dispatch]);

  function orderAmount(orderItems) {
    return orderItems.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  ) || 0;
  }


  if (loading) return <div>Загружаем заказы...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  
  const orderItems = (orders || []);


  return (
    <div>
      <h2>Заказы</h2>
      {orderItems.length === 0 ? (
        <p>Заказов нет.</p>
      ) : (
        <ul>
          {orderItems.map((order) => (
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

export default Oreders;
