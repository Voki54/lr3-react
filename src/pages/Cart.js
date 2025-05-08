import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { orderLineActions } from '../redux_components/entities/orderLines/orderLineEntity';
import { orderActions } from '../redux_components/entities/orders/orderEntity';
import styles from './styles/Cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.user);
  const { data: orderLines = [], loading, error } = useSelector((state) => state.orderLine);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(orderLineActions.fetchRequest(authUser.id));
    }
  }, [dispatch, authUser]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChangeCount = (orderLine, delta) => {
    const newCount = orderLine.count + delta;
    if (newCount < 1) return;
    dispatch(orderLineActions.updateRequest({ ...orderLine, count: newCount }));
  };

  const handleRemove = (id) => {
    dispatch(orderLineActions.deleteRequest(id));
  };

  const handleAddOrder = async () => {
    if (!authUser || orderLines.length === 0) return;

    const newOrder = {
      userId: authUser.id,
      orderLineIds: orderLines.map((ol) => ol.id),
    };

    try {
      await dispatch(orderActions.addRequest(newOrder));
      showNotification('success', 'Заказ успешно оформлен!');
    } catch (err) {
      showNotification('error', 'Ошибка при оформлении заказа.');
    }
  };

  const total = orderLines.reduce((sum, ol) => sum + ol.product.price * ol.count, 0);

  return (
    <div className={styles.cartContainer} role="main" aria-labelledby="cart-title">
      <h2 id="cart-title" className={styles.title}>Корзина</h2>

      {notification && (
        <div
          className={`${styles.notification} ${
            notification.type === 'success' ? styles.success : styles.error
          }`}
          role="alert"
          aria-live="polite"
        >
          {notification.message}
        </div>
      )}

      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p className={styles.error}>Ошибка: {error}</p>
      ) : orderLines.length === 0 ? (
        <p className={styles.empty}>Корзина пуста.</p>
      ) : (
        <>
          <ul className={styles.itemList}>
            {orderLines.map((ol) => (
              <li key={ol.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <p className={styles.name}>{ol.product.name}</p>
                  <p className={styles.price}>
                    {ol.product.price}₽ × {ol.count} шт. = {ol.product.price * ol.count}₽
                  </p>
                </div>
                <div className={styles.controls}>
                  <button onClick={() => handleChangeCount(ol, 1)} className={styles.button} aria-label="Увеличить количество">+</button>
                  <button onClick={() => handleChangeCount(ol, -1)} disabled={ol.count <= 1} className={styles.button} aria-label="Уменьшить количество">–</button>
                  <button onClick={() => handleRemove(ol.id)} className={styles.removeButton} aria-label="Удалить товар из корзины">Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className={styles.total}>Итого: {total}₽</h3>
          <button onClick={handleAddOrder} className={styles.submitButton}>Оформить заказ</button>
        </>
      )}
    </div>
  );
}

export default Cart;
