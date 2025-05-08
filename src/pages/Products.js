import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../redux_components/entities/products/productSlice';
import { orderLineActions } from '../redux_components/entities/orderLines/orderLineEntity';
import styles from './styles/Products.module.css';

function Products() {
  const dispatch = useDispatch();
  const { data: items, loading, error } = useSelector((state) => state.products);
  const authUser = useSelector((state) => state.user.user);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    dispatch(productActions.fetchRequest());
  }, [dispatch]);

  const handleAddToCart = (productId, productName) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }

    dispatch(orderLineActions.addRequest({ userId: authUser.id, productId }));
    setNotification(`«${productName}» добавлен в корзину`);

    setTimeout(() => setNotification(''), 3000); // Убираем уведомление через 3 сек
  };

  if (loading) return <div className={styles.status}>Загружаем товары...</div>;
  if (error) return <div className={`${styles.status} ${styles.error}`}>Ошибка: {error}</div>;

  return (
    <div className={styles.container}>
    {notification && (
      <div
        className={`${styles.toast} ${styles.success}`}
        role="status"
        aria-live="polite"
      >
        {notification}
      </div>
    )}


      <h2 className={styles.title} tabIndex="0">Товары</h2>
      {items.length === 0 ? (
        <p className={styles.empty} role="status">Нет доступных товаров.</p>
      ) : (
        <ul className={styles.itemList}>
          {items.map((product) => (
            <li key={product.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>Цена: {product.price}₽</p>
              </div>
              <div className={styles.controls}>
                <button
                  className={styles.button}
                  onClick={() => handleAddToCart(product.id, product.name)}
                  aria-label={`Добавить ${product.name} в корзину`}
                >
                  Добавить в корзину
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
