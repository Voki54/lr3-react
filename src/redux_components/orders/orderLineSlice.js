import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderLines, addOrderLine, deleteOrderLine, updateOrderLine } from './orderLineThunk'

const orderLineSlice = createSlice({
  name: 'orderLine',
  initialState: {
    orderLines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrderLines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderLines.fulfilled, (state, action) => {
        state.loading = false;
        state.orderLines = action.payload;
      })
      .addCase(fetchOrderLines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrderLine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrderLine.fulfilled, (state, action) => {
        state.loading = false;

        const orderLine = state.orderLines.find(
            (orderLine) => orderLine.id === action.payload.id
        );
        
        if (orderLine) {
            state.orderLines[orderLine.id] = action.payload;
        } else {
            state.orderLines.push(action.payload);
        }
      })
      .addCase(addOrderLine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderLine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderLine.fulfilled, (state, action) => {
        state.loading = false;
        state.orderLines = state.orderLines.filter(line => line.id !== action.payload);
      })
      .addCase(deleteOrderLine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderLine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderLine.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orderLines.findIndex(orderLine => orderLine.id === updatedOrder.id);
        if (index !== -1) {
          state.orderLines[index] = updatedOrder;
        }
      })
      .addCase(updateOrderLine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });;
  },
});

export default orderLineSlice.reducer;
