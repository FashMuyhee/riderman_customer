import {View, Text, HStack} from 'native-base';
import React from 'react';
import {Button, DashedDivider, SaveCardItem, ScreenWrapper} from '@components';
import {Wallet} from '@screens/payment-screeen/components/PaymentMethodSection';
import AddCardBtn from '@screens/payment-screeen/components/AddCardBtn';
import BottomSheet from '@gorhom/bottom-sheet';
import AddNewCardSheet from './component/AddNewCard';

const MyWallet = () => {
  const addNewRef = React.useRef<BottomSheet>(null);

  return (
    <ScreenWrapper pad barStyle="light-content">
      <Wallet />
      <HStack mb="10px" mt="10%" alignItems="center" justifyContent="space-between">
        <Button title="Add to Wallet" w="48%" bg="bg" color="black" />
        <Button title="Add to Wallet" w="48%" bg="black" color="white" />
      </HStack>
      <DashedDivider />
      <Text mt="3%" fontWeight="600" fontSize="12px" color="#263238">
        Payment Cards
      </Text>
      <View mt="5%">
        <SaveCardItem expiry="09/32" number="5531886652142950" withDelete cardId="11" />
        <SaveCardItem expiry="09/32" number="4242424242424242" withDelete cardId="11" />
      </View>
      <AddCardBtn onPress={() => addNewRef.current?.snapToIndex(0)} />
      <AddNewCardSheet ref={addNewRef} onClose={() => addNewRef.current?.close()} />
    </ScreenWrapper>
  );
};

export default MyWallet;
