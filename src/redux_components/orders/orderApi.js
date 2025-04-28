import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Order', 'OrderLine'],
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      query: (userId) => `orders?userId=${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Order', id: userId }],
      refetchOnMountOrArgChange: true,
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: 'orders/add',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: (result, error, order) => [
        { type: 'Order', id: order.userId },
        { type: 'OrderLine' },],
    }),
  }),
});

export const { useFetchOrdersQuery, useAddOrderMutation } = orderApi;
