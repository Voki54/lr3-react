import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux_components/entities/products/productSlice';
import { useAddOrderLineMutation } from '../redux_components/entities/orderLines/orderLineEntity';
import { useAuth } from '../account/AuthContext';

function Products() {
  const dispatch = useDispatch();
  const { data: items, loading, error } = useSelector((state) => state.products);
  const [addOrderLine, { isLoading: isAddingOrderLine }] = useAddOrderLineMutation();
  const { authUser } = useAuth();

  useEffect(() => {
    dispatch(productActions.fetchRequest());
  }, [dispatch]);

  const handleAddToCart = async (productId) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }
    await addOrderLine({ userId: authUser.id, productId });
  };

  if (loading) return <div>Загружаем товары...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Список товаров</h2>
      <ul>
        {items.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Цена: {product.price}₽</p>
            <button onClick={() => handleAddToCart(product.id)} disabled={isAddingOrderLine}>
              {isAddingOrderLine ? 'Добавление...' : 'Добавить в корзину'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
