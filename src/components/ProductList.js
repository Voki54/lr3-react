import { useEffect, useState } from "react";
import { store } from "../redux_components/store";
import { addProduct, updateProduct, removeProduct, addOrderToCart } from "../redux_components/actions";
import { createProduct } from "../redux_components/models/product";
import { useAuth } from "../account/AuthContext";
import { createOrder } from "../redux_components/models/order"

export const ProductList = () => {
  const { user } = useAuth();
  const [state, setState] = useState(store.getState());
  const [selectedProduct, setSelectedProduct] = useState(null);

  const currentCart = state.cart.items.find((cart) => cart.userId === user?.id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return unsubscribe;
  }, []);

  // заполняем форму при выборе товара для редактирования
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct) {
      const updated = {
        ...selectedProduct,
        ...formData,
      };
      store.dispatch(updateProduct(updated));
      setSelectedProduct(null);
    } else {
      const newProduct = createProduct({
        id: Date.now(),
        ...formData,
      });
      store.dispatch(addProduct(newProduct));
    }

    setFormData({ title: "", description: "", price: "" });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
  };

  const handleRemove = (id) => {
    store.dispatch(removeProduct(id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  const handleAddToCart = (product) => {
    const newOrder = createOrder({
      id: Date.now(),
      product,
      quantity: 1,
    });

    const orderDto = {
      cartId: currentCart.id,
      order: newOrder
    }

    store.dispatch(addOrderToCart(orderDto));
  };

  return (
    <div>
      {user?.role === 'admin' && (
        <>      
          <h2>{selectedProduct ? "Редактировать товар" : "Добавить товар"}</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
            <div>
              <label>Название: </label>
              <input name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <label>Описание: </label>
              <input name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
              <label>Цена: </label>
              <input name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            <button type="submit">
              {selectedProduct ? "Сохранить изменения" : "Добавить товар"}
            </button>
            {selectedProduct && (
              <button type="button" onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>
                Отмена
              </button>
            )}
          </form>
        </>
      )}

      <h2>Список товаров</h2>
      <ul>
        {state.products.items.map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> — {product.price}₽<br />
            <em>{product.description}</em><br />
            {user?.role === 'admin' && (
              <>
                <button onClick={() => handleEdit(product)}>Изменить</button>
                <button onClick={() => handleRemove(product.id)}>Удалить</button>
              </>
            )}
            <button onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
