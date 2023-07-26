import {StatusCode} from './auth';
import {PaymentMethod} from './delivery';

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
export type WithdrawToBankForm = {amount: string; bankId: number};

export type TransactionItem = {
  transactionId: number;
  userId: number;
  reference: string;
  type: 'debit' | 'credit';
  amount: number;
  purpose: string;
  paymentChannel: PaymentMethod;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
  meta: {
    recipient: string;
    note: string;
  };
};

export interface IWalletResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: WalletData;
}
export interface ITransactionResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: TransactionItem[];
}
