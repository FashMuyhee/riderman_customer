import {StatusCode} from './auth';

export type WalletData = {
  accountName: string;
  accountNumber: string;
  bank: {
    id: number;
    name: string;
    slug: string;
  };
  currency: string;
  accountBalance: string;
  accountType: string;
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
};

export type TipRiderForm = {
  riderId: string;
  amount: number;
};
export interface IWalletResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: WalletData;
}
