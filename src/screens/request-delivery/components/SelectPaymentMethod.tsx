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

const SelectPaymentMethod: React.FC<ISelectPaymentMethodProps> = ({method, onChange}) => {
  const methods: PaymentMethod[] = ['Card', 'Cash', 'Wallet'];

  const PaymentMethod = ({title, selected}: {title: PaymentMethod; selected: boolean}) => {
    const Icon = ({selected}: {selected: boolean}) => {
      if (title === 'Card') {
        return <CreditCardIcon selected={selected} />;
      }
      if (title === 'Cash') {
        return <MoneyIcon selected={selected} />;
      }
      if (title === 'Wallet') {
        return <WalletIcon selected={selected} />;
      }
      return null;
    };

    return <Button onPress={() => onChange(title)} w="32%" h="45px" bg={selected ? 'main' : 'white'} leftIcon={<Icon selected={selected} />} title={title} color={selected ? 'white' : 'main'} />;
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
