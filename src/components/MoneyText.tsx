import React from 'react';
import {Text, ITextProps, HStack} from 'native-base';

export type ICurrency = 'ngn' | 'usd';
interface MoneyTextProps extends ITextProps {
  restProps?: ITextProps;
  moneyValue?: string | number;
  showCurrency?: boolean;
  percentage?: boolean;
  currency?: ICurrency;
}

export const moneyFormat = (value: number | string, showNaira: boolean = false) => {
  const moneyValue = typeof value === 'number' ? value : parseFloat(value);
  const money = isNaN(moneyValue) ? 0 : moneyValue;
  const formatted = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return showNaira ? `\u20A6 ${formatted}` : formatted;
};

const MoneyText = ({moneyValue, showCurrency = true, percentage, currency = 'ngn', ...restProps}: MoneyTextProps) => {
  // @ts-ignore
  const value = isNaN(moneyValue) ? 0 : moneyValue;

  const getCurrency = () => {
    switch (currency) {
      case 'ngn':
        return `\u20A6`;
      case 'usd':
        return '$';
    }
  };
  return (
    <HStack alignItems="center" space="1">
      {showCurrency && <Text {...restProps}>{getCurrency()}</Text>}
      <Text {...restProps}>
        {/* @ts-ignore */}
        {percentage ? `${value}` : moneyFormat(value)}
      </Text>
    </HStack>
  );
};

export default MoneyText;
