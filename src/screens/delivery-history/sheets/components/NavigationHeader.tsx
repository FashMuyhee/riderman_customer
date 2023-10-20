import {DashedDivider} from '@components';
import {View, Text, HStack} from 'native-base';
import React from 'react';

type Props = {
  onClose: () => void;
  title: string;
};

export const NavigationHeader = ({onClose, title}: Props) => {
  return (
    <View mb="5px" h="60px">
      <HStack mt="-20px" w="full" alignItems="center" justifyContent="space-between" px="20px">
        <View w="1/3">
          <Text onPress={onClose} color="main" textAlign="left">
            Cancel
          </Text>
        </View>
        <View w="1/3">
          <Text fontSize="14px" textAlign="center" fontWeight="semibold">
            {title}
          </Text>
        </View>
        <View w="1/3" />
      </HStack>
      <DashedDivider mt="5px" />
    </View>
  );
};
