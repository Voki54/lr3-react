import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { orderLineActions } from '../redux_components/entities/orderLines/orderLineEntity';
import { orderActions } from '../redux_components/entities/orders/orderEntity';

function Cart() {
  const dispatch = useDispatch();
  
  const authUser = useSelector((state) => state.user.user);

  
  const { data: orderLines = [], loading, error } = useSelector((state) => state.orderLine);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(orderLineActions.fetchRequest(authUser.id));
    }
  }, [dispatch, authUser]);

  const handleChangeCount = (orderLine, delta) => {
    const newCount = orderLine.count + delta;
    if (newCount < 1) return;

    dispatch(orderLineActions.updateRequest({ ...orderLine, count: newCount }));
  };

  const handleRemove = (id) => {
    dispatch(orderLineActions.deleteRequest(id));
  };

  const handleAddOrder = () => {
    if (!authUser || orderLines.length === 0) return;

    const newOrder = {
      userId: authUser.id,
      orderLineIds: orderLines.map((ol) => ol.id),
    };

    dispatch(orderActions.addRequest(newOrder));
    // dispatch(orderLineActions.fetchRequest(authUser.id));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const total = orderLines.reduce(
    (sum, ol) => sum + ol.product.price * ol.count,
    0
  );

  return (
    <div>
      <h2>Корзина</h2>
      {orderLines.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <>
          <ul>
            {orderLines.map((ol) => (
              <li key={ol.id}>
                <p>{ol.product.name}</p>
                <p>{ol.product.price}₽ x {ol.count} шт. = {ol.product.price * ol.count}₽</p>
                <button onClick={() => handleChangeCount(ol, 1)}>+</button>
                <button onClick={() => handleChangeCount(ol, -1)} disabled={ol.count <= 1}>-</button>
                <button onClick={() => handleRemove(ol.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <h3>Итого: {total}₽</h3>
          <button onClick={handleAddOrder}>Оформить заказ</button>
        </>
      )}
    </div>
  );
}

export default Cart;
