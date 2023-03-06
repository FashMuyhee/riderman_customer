import {View, Text, HStack} from 'native-base';
import React from 'react';
import {Button, DashedDivider, SaveCardItem, ScreenWrapper} from '@components';
import {Wallet} from '@screens/payment-screeen/components/PaymentMethodSection';
import AddCardBtn from '@screens/payment-screeen/components/AddCardBtn';

const MyWallet = () => {
  return (
    <ScreenWrapper pad barStyle="light-content">
      <Wallet />
      <HStack
        mb="10px"
        mt="10%"
        alignItems="center"
        justifyContent="space-between">
        <Button title="Add to Wallet" w="48%" bg="bg" color="black" />
        <Button title="Withdrawn" w="48%" bg="black" color="white" />
      </HStack>
      <DashedDivider />
      <Text mt="3%" fontWeight="600" fontSize="12px" color="#263238">
        Payment Cards
      </Text>
      <View mt="5%">
        <SaveCardItem
          onDelete={console.log}
          expiry="09/32"
          number="5531886652142950"
          withDelete
          cardId="11"
          cardType="mastercard"
        />
        <SaveCardItem
          onDelete={console.log}
          expiry="09/32"
          number="4242424242424242"
          withDelete
          cardId="11"
          cardType="visa"
        />
      </View>
      <AddCardBtn />
    </ScreenWrapper>
  );
};

export default MyWallet;
