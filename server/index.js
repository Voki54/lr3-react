const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

app.use(express.json());
app.use(cors(corsOptions));

const users = [
  { id: 1, username: '1', password: '11'},
  { id: 2, username: '2', password: '22'},
];

const products = [
  { id: 1, name: 'Гелевая ручка', description: 'Синяя гелевая ручка с удобной прорезиненной ручкой', price: 55 },
  { id: 2, name: 'Тетрадь в клетку', description: '96 листов, плотная обложка, формат A5', price: 75 },
  { id: 3, name: 'Карандаш чернографитный', description: 'Классический HB карандаш с ластиком', price: 20 },
  { id: 4, name: 'Ластик', description: 'Белый мягкий ластик, не оставляет следов', price: 25 },
  { id: 5, name: 'Ручка шариковая', description: 'Красная шариковая ручка с тонким наконечником', price: 30 },
  { id: 6, name: 'Линейка пластиковая', description: '30 см, прозрачная с делениями в мм и см', price: 40 },
  { id: 7, name: 'Маркер текстовыделитель', description: 'Жёлтый текстовыделитель, не просвечивает бумагу', price: 60 },
  { id: 8, name: 'Скрепки канцелярские', description: 'Набор из 100 скрепок, металл', price: 45 },
  { id: 9, name: 'Папка на резинке', description: 'Пластиковая, синяя, для документов формата A4', price: 90 },
  { id: 10, name: 'Блок стикеров', description: 'Цветные стикеры для заметок, 100 листов', price: 70 },
];

const OrderLineStatus = Object.freeze({
  PENDING: 'PENDING',
  ORDERED: 'ORDERED',
});

const orderLines = [
  { id: 1687856465813, userId: 1, product: products.find((p) => p.id === 1), count: 2, status: OrderLineStatus.PENDING },
  { id: 1716762065813, userId: 1, product: products.find((p) => p.id === 3), count: 1, status: OrderLineStatus.ORDERED },
  { id: 1719392465835, userId: 2, product: products.find((p) => p.id === 2), count: 1, status: OrderLineStatus.PENDING },
];

function generateRandomDeliveryDate() {
  const minDays = 2;
  const maxDays = 14;
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  
  return new Date(Date.now() + randomDays * 24 * 60 * 60 * 1000).toISOString();
}

const orders = [
  { 
    id: 1719392465848,
    userId: 1,
    orderDate: new Date().toISOString(),
    deliveryDate: generateRandomDeliveryDate(),
    items: [ orderLines.find((l) => l.id === 1716762065813) ],
  },
];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }

  const newUser = { 
    id: users.length + 1, 
    username, 
    password 
  };

  users.push(newUser);
  
  res.status(201).json(newUser);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Неверное имя или пароль' });
  }
  console.log(1);
  console.log(orders);
  console.log(2);
  console.log(orderLines);

  res.status(200).json(user);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/cart', (req, res) => {
  const { userId } = req.query;
  const userOrderLines = orderLines.filter(o => o.userId === parseInt(userId, 10) && o.status === "PENDING");
  res.json(userOrderLines);
});

app.post('/api/add-to-cart', (req, res) => {
  try {
    const { userId, productId } = req.body;
    const storedProduct = products.find((p) => p.id === productId);

    if (!storedProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    let orderLine = orderLines.find((o) => o.userId === userId && o.product.id === productId && o.status === "PENDING");
    if (!orderLine) {
      orderLine = {
            id: Date.now(),
            userId,
            product: storedProduct,
            count: 1,
            status: OrderLineStatus.PENDING,
          };
      orderLines.push(orderLine);
    } else {
      orderLine.count += 1;
    }

    res.status(201).json(orderLine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/orders', (req, res) => {
  const { userId } = req.query;
  const userOrders = orders.filter(order => order.userId === parseInt(userId, 10));
  res.json(userOrders);
});

app.post('/api/orders/add', (req, res) => {
  try {
    const { userId, orderLineIds } = req.body;

    if (!orderLineIds || !Array.isArray(orderLineIds)) {
      return res.status(400).json({ message: 'Некорректные данные заказа' });
    }

    const updatedOrderLines = [];
    
    orderLineIds.forEach((id) => {
      const orderLine = orderLines.find((line) => line.id === id && line.userId === userId && line.status === 'PENDING');
      
      if (orderLine) {
        orderLine.status = OrderLineStatus.ORDERED;
        updatedOrderLines.push({ ...orderLine });
      }
    });
    
    if (updatedOrderLines.length === 0) {
      return res.status(404).json({ message: 'Нет строк заказа для оформления' });
    }

    newOrder = { 
      id: Date.now(),
      userId,
      orderDate: new Date().toISOString(),
      deliveryDate: generateRandomDeliveryDate(),
      items: updatedOrderLines,
    };

    orders.push(newOrder);

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/delete-order-line/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = orderLines.findIndex(line => line.id == id);

    if (index === -1) {
      return res.status(404).json({ message: 'Строка заказа не найдена' });
    }

    orderLines.splice(index, 1);
    res.status(200).json({ id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/order-update/:id', (req, res) => {
  const orderLineId = parseInt(req.params.id);

  const { count, status } = req.body;

  const orderIndex = orderLines.findIndex(orderLine => orderLine.id === orderLineId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Заказ не найден' });
  }

  if (count !== undefined) {
    orderLines[orderIndex].count = count;
  }
  if (status !== undefined) {
    orderLines[orderIndex].status = status;
  }

  res.json(orderLines[orderIndex]);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
