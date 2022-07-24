import detectCard from '@utils/detect-card';
import {View, HStack, Text} from 'native-base';
import React from 'react';
import CreditCardLogo from './CreditCardLogo';
import Checkbox from './icons/checkbox';

type IProps = {
  number: string;
  expiry: string;
  selected: boolean;
};

const SaveCardItem = ({expiry, number, selected}: IProps) => {
  return (
    <HStack alignItems="center" w="full" py="5px" px="10px" h="60px" borderWidth={selected ? 1.5 : 0} borderColor="main" rounded="md">
      <CreditCardLogo creditCardNumber={number} />
      <View w="78%" ml="20px">
        <Text fontWeight="600" fontSize="13px">
          {detectCard(number)?.formattedValue}
        </Text>
        <Text fontSize="11px" fontWeight="light" color="grey.200">
          Expires {expiry}
        </Text>
      </View>
      {selected && (
        <View alignSelf="center">
          <Checkbox />
        </View>
      )}
    </HStack>
  );
};

export default SaveCardItem;
