import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../redux_components/entities/orders/orderEntity';
import { formatDate } from '../helpers/formatDate';
import styles from './styles/Orders.module.css';

function Orders() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.user);
  const { data: orders = [], loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(orderActions.fetchRequest(authUser.id));
    }
  }, [dispatch, authUser?.id]);

  function orderAmount(orderItems) {
    return orderItems.reduce(
      (sum, item) => sum + item.product.price * item.count,
      0
    ) || 0;
  }

  if (loading) return <div className={styles.notification}>Загрузка заказов...</div>;
  if (error) return <div className={`${styles.notification} ${styles.error}`}>Ошибка: {error}</div>;

  return (
    <main className={styles.ordersContainer} role="main" aria-labelledby="orders-title">
      <h2 id="orders-title" className={styles.title}>Мои заказы</h2>
      {orders.length === 0 ? (
        <p className={styles.empty}>У вас пока нет заказов.</p>
      ) : (
        <ul className={styles.itemList} aria-live="polite">
          {orders.map((order) => (
            <li key={order.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <p className={styles.name}>Дата заказа: <strong>{formatDate(order.orderDate)}</strong></p>
                <p className={styles.price}>Дата доставки: {formatDate(order.deliveryDate)}</p>
                <ul className={styles.innerList}>
                  {order.items.map((orderLine) => (
                    <li key={orderLine.id} className={styles.innerItem}>
                      <div className={styles.productName}>{orderLine.product.name}</div>
                      <div className={styles.productDetails}>
                        {orderLine.count} шт. × {orderLine.product.price}₽ = 
                        <span className={styles.productTotal}>
                          {orderLine.product.price * orderLine.count}₽
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className={styles.total}>Сумма заказа: {orderAmount(order.items)}₽</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Orders;
