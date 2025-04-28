import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderLines = createAsyncThunk(
  'orderLine/fetchOrderLines', 
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart?userId=${userId}`);
    
      if (!response.ok) {
        throw new Error('Не удалось загрузить заказы');
      }

      return await response.json(); 
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

export const addOrderLine = createAsyncThunk(
  'orderLine/addOrderLine', 
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
    
      if (!response.ok) {
        throw new Error('Не удалось добавить заказ');
      }

      return await response.json(); 
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

export const deleteOrderLine = createAsyncThunk(
  'orderLine/deleteOrderLine',
  async (orderLineId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-order-line/${orderLineId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить заказ');
      }

      return orderLineId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderLine = createAsyncThunk(
  'order/updateOrderLine',
  async (updatedOrder, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order-update/${updatedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить заказ');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  