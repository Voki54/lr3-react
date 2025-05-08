import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux_components/entities/products/productSlice';
import { orderLineActions } from '../redux_components/entities/orderLines/orderLineEntity';

function Products() {
  const dispatch = useDispatch();
  const { data: items, loading, error } = useSelector((state) => state.products);
  const authUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(productActions.fetchRequest());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }

    dispatch(orderLineActions.addRequest({ userId: authUser.id, productId }));
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
            <button onClick={() => handleAddToCart(product.id)}>
              Добавить в корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
