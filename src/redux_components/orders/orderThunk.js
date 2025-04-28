import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders', 
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders?userId=${userId}`);
    
      if (!response.ok) {
        throw new Error('Не удалось загрузить заказы');
      }

      return await response.json(); 
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  'order/addOrder', 
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
    
      if (!response.ok) {
        throw new Error('Не удалось оформить заказ');
      }

      return await response.json(); 
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);
  