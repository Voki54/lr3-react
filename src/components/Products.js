import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux_components/products/productThunk';
import { addOrderLine } from '../redux_components/orders/orderLineThunk'; 
import { useAuth } from '../account/AuthContext';

function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { authUser } = useAuth();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }
    dispatch(addOrderLine({ userId: authUser.id, productId }));
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
            <button onClick={() => handleAddToCart(product.id)}>Добавить в корзину</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
