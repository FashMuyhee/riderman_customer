import React from 'react';
import {HStack, View} from 'native-base';
import {hp} from '@utils/responsive';
import WalletIcon from '@components/icons/wallet';
import MoneyIcon from '@components/icons/money';
import CreditCardIcon from '@components/icons/credit-card';
import {Button} from '@components';
import {PaymentMethod} from '@models/delivery';

export type ISelectPaymentMethodProps = {
  method: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

export const PaymentMethodIcon = ({selected, method}: {selected: boolean; method: PaymentMethod}) => {
  if (method === 'card') {
    return <CreditCardIcon selected={selected} />;
  }
  if (method === 'cash') {
    return <MoneyIcon selected={selected} />;
  }
  if (method === 'wallet') {
    return <WalletIcon selected={selected} />;
  }
  return null;
};

const SelectPaymentMethod: React.FC<ISelectPaymentMethodProps> = ({method, onChange}) => {
  const methods: PaymentMethod[] = ['cash', 'card', 'wallet'];

  const PaymentMethod = ({title, selected}: {title: PaymentMethod; selected: boolean}) => {
    return (
      <Button
        onPress={() => onChange(title)}
        w="32%"
        h="45px"
        bg={selected ? 'main' : 'white'}
        leftIcon={<PaymentMethodIcon selected={selected} method={title} />}
        title={title}
        color={selected ? 'white' : 'main'}
      />
    );
  };

  return (
    <HStack alignItems="center" justifyContent="space-between" h="50px" mt="2%">
      {methods.map(item => (
        <PaymentMethod title={item} selected={method === item} />
      ))}
    </HStack>
  );
};

export default SelectPaymentMethod;
