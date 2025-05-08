import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { orderLineActions, orderLineSelectors } from '../redux_components/entities/orderLines/orderLineEntity';
import { useAddOrderMutation } from '../redux_components/entities/orders/orderApi';
import { useAuth } from '../account/AuthContext';

function Cart() {
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  const orderLines = useSelector(orderLineSelectors.selectAll);
  const loading = useSelector(orderLineSelectors.selectLoading);
  const error = useSelector(orderLineSelectors.selectError);

  const [addOrder] = useAddOrderMutation();

  useEffect(() => {
    if (authUser) {
      dispatch(orderLineActions.fetchRequest(authUser.id));
    }
  }, [authUser]);

  const handleChangeCount = (orderLine, delta) => {
    const newCount = orderLine.count + delta;
    if (newCount < 1) return;

    dispatch(orderLineActions.updateRequest({ ...orderLine, count: newCount }));
  };

  const handleRemove = (id) => {
    dispatch(orderLineActions.deleteRequest(id));
  };

  const handleAddOrder = async () => {
    const orderLineIds = orderLines.map((ol) => ol.id);
    await addOrder({ userId: authUser.id, orderLineIds });
    dispatch(orderLineActions.fetchRequest(authUser.id)); // обновим корзину
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
                <p>{ol.product.price}₽ x {ol.count}</p>
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