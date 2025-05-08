export const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    if (!res.ok) throw new Error('Ошибка загрузки товаров');
    return res.json();
  };