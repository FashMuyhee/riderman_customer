import { DeliveryStatus, IDeliveriesResponse, IDeliveryResponse } from '@models/delivery';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@utils/http';

export const deliveryApi = createApi({
  reducerPath: 'deliveryApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/customer/deliveries' }),
  tagTypes: ['DeliveryRequest'],
  endpoints: builder => ({
    getDeliveries: builder.query<IDeliveriesResponse, number>({
      query(page) {
        return {
          url: `?page=${page}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ deliveryId }) => ({ type: 'DeliveryRequest' as const, id: deliveryId })),
            { type: 'DeliveryRequest', id: 'ALL_DELIVERIES' },
          ]
          : [{ type: 'DeliveryRequest', id: 'ALL_DELIVERIES' }],
    }),
    getDeliveriesByStatus: builder.query<IDeliveriesResponse, { page: number, status: DeliveryStatus }>({
      query(req) {
        return {
          url: `?status=${req.status.toLocaleLowerCase()}&page=${req.page}`,
          method: 'GET',
        };
      },
      providesTags: (result, _, req) =>
        result
          ? [
            ...result.data.map(({ deliveryId }) => ({ type: 'DeliveryRequest' as const, id: deliveryId })),
            { type: 'DeliveryRequest', id: `${req.status.toUpperCase()}_DELIVERIES` },
          ]
          : [{ type: 'DeliveryRequest', id: `${req.status.toUpperCase()}_DELIVERIES` }],
    }),
    getSingleDelivery: builder.mutation<IDeliveryResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'GET',
        };
      },
      invalidatesTags: (__, _, req) => [{ type: 'DeliveryRequest', id: req }],
    }),
  }),
});

export const { useGetDeliveriesByStatusQuery, useGetDeliveriesQuery, useGetSingleDeliveryMutation } = deliveryApi;
