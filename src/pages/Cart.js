import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderLines, deleteOrderLine, updateOrderLine } from '../redux_components/orders/orderLineThunk';
import { addOrder } from '../redux_components/orders/orderThunk';
import { useAuth } from '../account/AuthContext';

function Cart() {
  const dispatch = useDispatch();
  const { orderLines, loading, error } = useSelector((state) => state.orderLines);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchOrderLines(authUser.id));
    }
  }, [authUser, dispatch]);

  const handleAddOrder = async (cartItems) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }

    const orderLineIds = [];
    const userId = authUser.id;

    cartItems.forEach((item) => {
      orderLineIds.push(item.id)
    });

    await dispatch(addOrder({ userId, orderLineIds }));
    await dispatch(fetchOrderLines(userId));
  };  

  const handleChangeCount = (orderLine, delta) => {
    const newCount = orderLine.count + delta;
    if (newCount < 1) return;
  
    const updatedOrder = {
      ...orderLine,
      count: newCount,
    };
  
    dispatch(updateOrderLine(updatedOrder));
  };

  const handleRemove = async (orderLineId) => {
    await dispatch(deleteOrderLine(orderLineId));
  };



  if (loading) return <div>Загружаем корзину...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  
  const cartItems = (orderLines || []);

  const total = cartItems.reduce(
    (sum, orderLine) => sum + orderLine.product.price * orderLine.count,
    0
  ) || 0;

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((orderLine) => (
              <li key={orderLine.id}>
                <p>{orderLine.product.name}</p>
                <p>Описание товара: {orderLine.product.description}</p>
                <p>{orderLine.product.price}₽, {orderLine.count} шт. = {orderLine.product.price * orderLine.count}₽</p>
                <button onClick={() => handleChangeCount(orderLine, 1)}>+</button>
                <button onClick={() => handleChangeCount(orderLine, -1)} disabled={orderLine.count <= 1}>-</button>
                <button onClick={() => handleRemove(orderLine.id)}>Удалить из корзины</button>
              </li>
            ))}
          </ul>
          <h3>Итого: {total}₽</h3>
          <button onClick={() => handleAddOrder(cartItems)} >Оформить заказ</button>
        </>
        
      )}

    </div>
  );
}

export default Cart;
