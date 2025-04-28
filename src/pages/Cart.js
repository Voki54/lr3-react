import { useAddOrderMutation } from '../redux_components/orders/orderApi';
import { useAuth } from '../account/AuthContext';
import {
  useFetchOrderLinesQuery,
  useUpdateOrderLineMutation,
  useDeleteOrderLineMutation,
} from '../redux_components/orders/orderLineApi';

function Cart() {
  const [addOrder, { isLoading: isAddingOrder  }] = useAddOrderMutation();
  const { authUser } = useAuth();
  const { data: orderLines = [], isLoading, error, refetch } = useFetchOrderLinesQuery(authUser?.id);

  const [updateOrderLine, { isLoading: isUpdating }] = useUpdateOrderLineMutation();
  const [deleteOrderLine, { isLoading: isDeleting }] = useDeleteOrderLineMutation();

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

    await addOrder({ userId, orderLineIds }).unwrap();
    await refetch();
  };  

  const handleChangeCount = async (orderLine, delta) => {
    const newCount = orderLine.count + delta;
    if (newCount < 1) return;
  
    const updatedOrder = {
      ...orderLine,
      count: newCount,
    };
  
    await updateOrderLine(updatedOrder);
  };

  const handleRemove = async (orderLineId) => {
    await deleteOrderLine(orderLineId);
  };



  if (isLoading) return <div>Загружаем корзину...</div>;
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
          <button onClick={() => handleAddOrder(cartItems)} disabled={isAddingOrder}>
            {isAddingOrder ? 'Оформление...' : 'Оформить заказ'}
          </button>
        </>
        
      )}

    </div>
  );
}

export default Cart;
