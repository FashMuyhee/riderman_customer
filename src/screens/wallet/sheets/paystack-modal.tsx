import React from 'react';
// @ts-ignore
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {useTheme} from 'native-base';
// @ts-ignore
import {PAYSTACK_TEST, PAYSTACK_LIVE} from '@env';
import useAuth from '@contexts/useAuth';

export interface PaytstackSuccess {
  data: Data;
  status: string;
  transactionRef: TransactionRef;
}
export interface Data {
  event: string;
  transactionRef: TransactionRef;
}
export interface TransactionRef {
  message: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

type Props = {
  onDone: (d: PaytstackSuccess) => void;
  onCancel: () => void;
  transRef: string;
  amount: number;
};

const PaystackModal = React.forwardRef<paystackProps.PayStackRef, Props>(
  ({onCancel, onDone, transRef, amount}, ref) => {
    const {colors} = useTheme();
    const {user} = useAuth();
    return (
      <Paystack
        paystackKey={__DEV__ ? PAYSTACK_TEST : PAYSTACK_LIVE}
        billingEmail={user?.email}
        activityIndicatorColor={colors.main}
        billingName={`${user?.firstName} ${user?.lastName}`}
        amount={amount}
        onCancel={onCancel}
        onSuccess={onDone}
        ref={ref}
        refNumber={transRef}
      />
    );
  },
);

export default PaystackModal;
