import { useGetProductsQuery } from '../redux_components/products/productsApi';
import { useAddOrderLineMutation } from '../redux_components/orders/orderLineApi';
import { useAuth } from '../account/AuthContext';

function Products() {
  const { data: items = [], error, isLoading } = useGetProductsQuery();
  const [addOrderLine, { isLoading: isAddingOrderLine }] = useAddOrderLineMutation();
  const { authUser } = useAuth();

  const handleAddToCart = async (productId) => {
    if (!authUser) {
      alert('Сначала нужно войти!');
      return;
    }
    await addOrderLine({ userId: authUser.id, productId });
  };

  if (isLoading) return <div>Загружаем товары...</div>;
  if (error) return <div style={{ color: 'red' }}>Ошибка загрузки товаров</div>;

  return (
    <div>
      <h2>Список товаров</h2>
      <ul>
        {items.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Цена: {product.price}₽</p>
            <button onClick={() => handleAddToCart(product.id)}disabled={isLoading}>
              {isLoading ? 'Добавление...' : 'Добавить в корзину'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
