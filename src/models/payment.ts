import {CardType} from '@components/CreditCardLogo';
import {StatusCode} from './auth';
import { PaymentMethod } from './delivery';

export type SaveCard = {
  paymentCardId: number;
  lastDigits: string;
  expiryMonth: string;
  expiryYear: string;
  bank: string;
  countryCode: string;
  brand: string;
  accountName: string;
  cardType: CardType;
  maskedCard: string;
};

export interface IAddCardResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: SaveCard;
}

export interface IInitializeCardResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: {
    accessCode: string;
    reference: string;
  } | null;
}

export interface IAllSavedCardResponse {
  message: string;
  success: boolean;
  statusCode: StatusCode;
  data: SaveCard[];
}

export type MakePaymentPayload =  {
  pickupRequestId: string;
  method: PaymentMethod;
  cardId?: string;
}