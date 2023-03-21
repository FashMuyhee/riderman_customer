import {
  IWalletResponse,
  TipRiderForm,
  WithdrawToBankForm,
} from '@models/wallet';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utils/http';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: axiosBaseQuery({baseUrl: '/'}),
  tagTypes: ['WalletRequest'],
  endpoints: builder => ({
    getWalletBalance: builder.query<IWalletResponse, void>({
      query() {
        return {
          url: ``,
          method: 'get',
        };
      },
      providesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
    fundWithSaveCard: builder.mutation<
      IWalletResponse,
      {amount: number; cardId: number}
    >({
      query(body) {
        return {
          url: `wallet/fund/card/${body.cardId}`,
          method: 'post',
          data: {amount: body.amount},
        };
      },
      invalidatesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
    fundWithNewCard: builder.mutation<
      IWalletResponse,
      {reference: string; saveCard: boolean}
    >({
      query(body) {
        return {
          url: `wallet/fund/card`,
          method: 'post',
          data: body,
        };
      },
      invalidatesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
    withdrawToBank: builder.mutation<IWalletResponse, WithdrawToBankForm>({
      query(body) {
        return {
          url: `wallet/withdraw/${body.bankId}`,
          method: 'post',
          data: {amount: parseFloat(body.amount) * 100},
        };
      },
      invalidatesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
    sendTipToRider: builder.mutation<IWalletResponse, TipRiderForm>({
      query(body) {
        return {
          url: `customer/tip/wallet`,
          method: 'post',
          data: body,
        };
      },
      invalidatesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useFundWithSaveCardMutation,
  useFundWithNewCardMutation,
  useWithdrawToBankMutation,
  useSendTipToRiderMutation,
} = walletApi;
