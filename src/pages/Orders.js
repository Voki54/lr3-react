import { useFetchOrdersQuery } from '../redux_components/orders/orderApi';
import { useAuth } from '../account/AuthContext';

function Oreders() {
  const { authUser } = useAuth();
  const { data: orders = [], isLoading, error } = useFetchOrdersQuery(authUser?.id);

  function orderAmount(orderItems) {
    return orderItems.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  ) || 0;
  }

  if (isLoading) return <div>Загружаем заказы...</div>;
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
