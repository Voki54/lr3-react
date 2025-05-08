const BASE = 'http://localhost:5000/api';

export async function fetchOrders(userId) {
    const res = await fetch(`${BASE}/orders?userId=${userId}`);
    if (!res.ok) throw new Error('Ошибка при загрузке заказов');
    return res.json();
  }
  
  export async function addOrder(order) {
    const res = await fetch(`${BASE}/orders/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Ошибка при оформлении заказа');
    return res.json();
  }
  