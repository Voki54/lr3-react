const BASE = 'http://localhost:5000/api';

export const fetchOrderLines = async (userId) => {
    const res = await fetch(`${BASE}/cart?userId=${userId}`);
    if (!res.ok) throw new Error('Ошибка при загрузке корзины');
    return res.json();
  };
  
  export const addOrderLine = async (order) => {
    const res = await fetch(`${BASE}/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Ошибка при добавлении в корзину');
    return res.json();
  };
  
  export const updateOrderLine = async (order) => {
    const res = await fetch(`${BASE}/order-update/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Ошибка при обновлении');
    return res.json();
  };
  
  export const deleteOrderLine = async (orderLineId) => {
    const res = await fetch(`${BASE}/delete-order-line/${orderLineId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Ошибка при удалении');
    return { id: orderLineId };
  };
  