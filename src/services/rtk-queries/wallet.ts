import {IWalletResponse} from '@models/wallet';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@utils/http';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: axiosBaseQuery({baseUrl: '/wallet'}),
  tagTypes: ['WalletRequest'],
  endpoints: builder => ({
    getWalletBalance: builder.query<IWalletResponse, void>({
      query(body) {
        return {
          url: ``,
          method: 'get',
        };
      },
      providesTags: [{type: 'WalletRequest', id: 'Balance'}],
    }),
  }),
});

export const {useGetWalletBalanceQuery} = walletApi;
