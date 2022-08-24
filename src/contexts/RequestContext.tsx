import {IDeliveryRequestBody, PaymentMethod} from '@models/delivery';
import {createContext, useState} from 'react';
import React from 'react';

interface RequestContext {
  paymentMethod: PaymentMethod;
  deliveryBody: IDeliveryRequestBody[];
  amount: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setDeliveryBody: React.Dispatch<React.SetStateAction<IDeliveryRequestBody[]>>;
}

export const RequestContext = createContext<RequestContext>({
  amount: '',
  deliveryBody: [],
  paymentMethod: 'Cash',
  setAmount: () => {},
  setDeliveryBody: () => {},
  setPaymentMethod: () => {},
});

export const RequestContextProvider = ({children}: {children: React.ReactNode}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [amount, setAmount] = useState('0');
  const [deliveryBody, setDeliveryBody] = useState<IDeliveryRequestBody[]>([]);

  return <RequestContext.Provider value={{amount, deliveryBody, paymentMethod, setAmount, setDeliveryBody, setPaymentMethod}}>{children}</RequestContext.Provider>;
};
