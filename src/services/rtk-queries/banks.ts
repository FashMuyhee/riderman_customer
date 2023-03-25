import {
  AddBankAccountForm,
  IAddBankAccountResponse,
  BankAccountData,
  IBankAccountsResponse,
} from '@models/bank';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utils/http';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: axiosBaseQuery({baseUrl: '/bank-accounts'}),
  tagTypes: ['BankAccounts', 'CommercialBanks'],
  endpoints: builder => ({
    addBankAccount: builder.mutation<
      IAddBankAccountResponse,
      AddBankAccountForm
    >({
      query(body) {
        return {
          url: `/create`,
          method: 'post',
          data: body,
        };
      },
      invalidatesTags: result =>
        result
          ? [{type: 'BankAccounts', id: result.data.bankAccountId}]
          : [{type: 'BankAccounts', id: 'BANKS_ACCOUNTS'}],
    }),
    getBankAccounts: builder.query<BankAccountData[], void>({
      query() {
        return {
          url: ``,
          method: 'GET',
        };
      },
      transformResponse: (returnValue: IBankAccountsResponse) => {
        return !!returnValue?.data ? returnValue?.data : [];
      },
      providesTags: (result, _, req) =>
        result
          ? [
              ...result.map(({bankAccountId}) => ({
                type: 'BankAccounts' as const,
                id: bankAccountId,
              })),
              {
                type: 'BankAccounts',
                id: 'BANKS_ACCOUNTS',
              },
            ]
          : [
              {
                type: 'BankAccounts',
                id: 'BANKS_ACCOUNTS',
              },
            ],
    }),
    deleteBankAccount: builder.mutation<IAddBankAccountResponse, string>({
      query(bankId) {
        return {
          url: `/delete/${bankId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, _, req) => [
        {
          type: 'BankAccounts',
          id: req,
        },
        {
          type: 'BankAccounts',
          id: 'BANKS_ACCOUNTS',
        },
      ],
    }),
  }),
});

export const {
  useAddBankAccountMutation,
  useDeleteBankAccountMutation,
  useGetBankAccountsQuery,
} = bankApi;
