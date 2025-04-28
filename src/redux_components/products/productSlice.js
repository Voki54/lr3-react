import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productThunk'

const productSlice = createSlice({
    name: 'products',
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default productSlice.reducer;