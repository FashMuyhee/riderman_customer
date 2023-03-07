import {IAddCardResponse, IAllSavedCardResponse} from '@models/payment';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utils/http';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: axiosBaseQuery({baseUrl: '/payment-cards/'}),
  tagTypes: ['PaymentRequest'],
  endpoints: builder => ({
    addCard: builder.mutation<IAddCardResponse, {reference: string}>({
      query(body) {
        return {
          url: `create`,
          method: 'post',
          data: body,
        };
      },
      invalidatesTags: result =>
        result
          ? [{type: 'PaymentRequest', id: result.data.paymentCardId}]
          : [{type: 'PaymentRequest', id: 'SAVE_CARDS'}],
    }),
    getCards: builder.query<IAllSavedCardResponse, void>({
      query() {
        return {
          url: `/`,
          method: 'GET',
        };
      },
      providesTags: (result, _, req) =>
        result
          ? [
              ...result.data.map(({paymentCardId}) => ({
                type: 'PaymentRequest' as const,
                id: paymentCardId,
              })),
              {
                type: 'PaymentRequest',
                id: 'SAVE_CARDS',
              },
            ]
          : [
              {
                type: 'PaymentRequest',
                id: 'SAVE_CARDS',
              },
            ],
    }),
    deleteCard: builder.mutation<IAllSavedCardResponse, string>({
      query(cardId) {
        return {
          url: `/delete/${cardId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, _, req) =>
        result
          ? [
              {
                type: 'PaymentRequest',
                id: req,
              },
              {
                type: 'PaymentRequest',
                id: 'SAVE_CARDS',
              },
            ]
          : [
              {
                type: 'PaymentRequest',
                id: 'SAVE_CARDS',
              },
            ],
    }),
  }),
});

export const {useAddCardMutation, useGetCardsQuery, useDeleteCardMutation} =
  paymentApi;
