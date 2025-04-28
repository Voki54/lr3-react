import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Ошибка при загрузке товаров');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);