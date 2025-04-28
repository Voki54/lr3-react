import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderLineApi = createApi({
  reducerPath: 'orderLineApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['OrderLine'],
  endpoints: (builder) => ({
    fetchOrderLines: builder.query({
      query: (userId) => `cart?userId=${userId}`,
      providesTags: (result, error, userId) => [
        { type: 'OrderLine', id: userId }, 
        { type: 'OrderLine' }
    ],
      refetchOnMountOrArgChange: true,
    }),
    addOrderLine: builder.mutation({
      query: (order) => ({
        url: 'add-to-cart',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: (result, error, order) => [{ type: 'OrderLine', id: order.userId }],
    }),
    deleteOrderLine: builder.mutation({
      query: (orderLineId) => ({
        url: `delete-order-line/${orderLineId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, orderLineId) => [{ type: 'OrderLine' }],
    }),
    updateOrderLine: builder.mutation({
      query: (updatedOrder) => ({
        url: `order-update/${updatedOrder.id}`,
        method: 'PUT',
        body: updatedOrder,
      }),
      invalidatesTags: (result, error, updatedOrder) => [{ type: 'OrderLine' }],
    }),
  }),
});

export const {
  useFetchOrderLinesQuery,
  useAddOrderLineMutation,
  useDeleteOrderLineMutation,
  useUpdateOrderLineMutation,
} = orderLineApi;
