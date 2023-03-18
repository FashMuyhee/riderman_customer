import {StatusCode} from './auth';

export type AddBankAccountForm = {
  accountNumber: string;
  bankCode: string;
  currency: string;
  bankImage: string;
  bankName: string;
};

export type CommercialBanksData = {
  name: string;
  code: string;
  type: string;
  active: boolean;
  currency: 'NGN';
  image: string;
};

export type BankAccountData = {
  bankAccountId: number;
  maskedAccountNumber: string;
  accountName: string;
  bankCode: string;
  currency: 'NGN';
  bankImage: string;
  validated: boolean;
  createdAt: string;
};

export interface IAddBankAccountResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: BankAccountData;
}

export interface IBankAccountsResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: BankAccountData[];
}

export interface ICommercialBankResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: BankAccountData[];
}
