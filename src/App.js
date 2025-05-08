import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import PrivateRoute from './account/PrivateRoute';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
