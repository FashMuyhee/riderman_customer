import {View, HStack, Text, Pressable} from 'native-base';
import React from 'react';
import Checkbox from '@components/icons/checkbox';
import DeleteIcon from '@components/icons/delete';
import {Image} from 'react-native';
import {BankAccountData} from '@models/bank';

interface IProps extends BankAccountData {
  onDelete: (id: number) => void;
  onPress: (id: number) => void;
  selected: boolean;
}

const BankItem = ({
  accountName,
  bankAccountId,
  bankImage,
  maskedAccountNumber,
  onDelete,
  onPress,
  selected,
}: IProps) => {
  return (
    <Pressable onPress={() => onPress(bankAccountId)}>
      <HStack
        mb="10px"
        alignItems="center"
        w="full"
        py="5px"
        px="10px"
        h="60px"
        borderWidth={selected ? 3 : 1}
        borderColor="main"
        rounded="lg">
        <Image source={{uri: bankImage}} style={{height: 45, width: 45}} />
        <View w="74%" ml="20px">
          <Text fontWeight="600" fontSize="13px">
            {accountName}
          </Text>
          <HStack alignItems="center" space="5">
            <Text fontSize="11px" fontWeight="light" color="dark.200">
              {maskedAccountNumber}
            </Text>
            {selected && <Checkbox />}
          </HStack>
        </View>
        <View alignSelf="center">
          <Pressable onPress={() => onDelete(bankAccountId)}>
            <DeleteIcon />
          </Pressable>
        </View>
      </HStack>
    </Pressable>
  );
};

export default BankItem;
