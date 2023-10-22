import {DashedDivider} from '@components';
import {View, Text, HStack} from 'native-base';
import React from 'react';

type Props = {
  onClose: () => void;
  title: string;
};

export const SheetNavigationHeader = ({onClose, title}: Props) => {
  return (
    <View mb="5px" h="60px">
      <HStack my="10px" w="full" alignItems="center" justifyContent="space-between" px="20px">
        <View w="20%">
          <Text onPress={onClose} color="main" textAlign="left">
            Close
          </Text>
        </View>
        <View w="60%">
          <Text fontSize="14px" textAlign="center" fontWeight="semibold">
            {title}
          </Text>
        </View>
        <View w="20%" />
      </HStack>
      <DashedDivider mt="5px" />
    </View>
  );
};
