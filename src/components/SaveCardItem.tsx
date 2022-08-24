import detectCard from '@utils/detect-card';
import {View, HStack, Text, Pressable} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import CreditCardLogo from './CreditCardLogo';
import Checkbox from './icons/checkbox';
import DeleteIcon from './icons/delete';

type IProps = {
  number: string;
  expiry: string;
  selected?: boolean;
  onDelete?: (cardId?: string) => void;
  withDelete?: boolean;
  shadow?: boolean;
  bgColor?: ColorType;
  cardId?: string;
};

const SaveCardItem = ({expiry, number, selected, onDelete, withDelete, cardId, bgColor, shadow}: IProps) => {
  const renderBorderWith = () => {
    if (selected) return 1.5;
    if (withDelete) return 1;
    return 0;
  };

  const renderBorderColor = () => {
    if (selected) return 'main';
    if (withDelete) return '#eaeaea';
  };


  return (
    <HStack mb="10px" bg={bgColor} shadow="2" alignItems="center" w="full" py="5px" px="10px" h="60px" borderWidth={renderBorderWith()} borderColor={renderBorderColor()} rounded="lg">
      <CreditCardLogo creditCardNumber={number} />
      <View w="78%" ml="20px">
        <Text fontWeight="600" fontSize="13px">
          {detectCard(number)?.formattedValue}
        </Text>
        <Text fontSize="11px" fontWeight="light" color="grey.200">
          Expires {expiry}
        </Text>
      </View>
      <View alignSelf="center">
        {selected && <Checkbox />}
        {withDelete && (
          // @ts-ignore
          <Pressable onPress={() => onDelete(cardId)}>
            <DeleteIcon />
          </Pressable>
        )}
      </View>
    </HStack>
  );
};

export default SaveCardItem;
