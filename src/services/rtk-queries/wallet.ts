import {
  ITransactionResponse,
  IWalletResponse,
  TipRiderForm,
  TransactionItem,
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
          url: `wallet`,
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
    getTransactionHistory: builder.query<TransactionItem[], number>({
      query(page) {
        return {
          url: `customer/transactions?page=${page}`,
          method: 'get',
        };
      },
      transformResponse: (returnValue: ITransactionResponse) => {
        // const transformed = returnValue.data.map(i => {
        //   return {...i,account:`${}`};
        // });
        return !!returnValue?.data ? returnValue?.data : [];
      },
      // @ts-ignore
      providesTags: (result: TransactionItem[]) =>
        result
          ? [
              ...result.map(({transactionId}) => ({
                type: 'TransactionRequest',
                id: transactionId,
              })),
            ]
          : [{type: 'TransactionRequest', id: 'transactions'}],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useFundWithSaveCardMutation,
  useFundWithNewCardMutation,
  useWithdrawToBankMutation,
  useSendTipToRiderMutation,
  useGetTransactionHistoryQuery,
} = walletApi;
