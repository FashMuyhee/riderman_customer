import {View, Text, HStack} from 'native-base';
import React, {useEffect} from 'react';
import {
  Button,
  DashedDivider,
  RenderSnackbar,
  SaveCardItem,
  ScreenWrapper,
} from '@components';
import {Wallet} from '@screens/payment-screeen/components/PaymentMethodSection';
import AddCardBtn from '@screens/payment-screeen/components/AddCardBtn';
import {
  useDeleteCardMutation,
  useGetCardsQuery,
} from '@services/rtk-queries/payments';
import {CardType} from '@components/CreditCardLogo';
import {Alert} from 'react-native';

const MyWallet = () => {
  const {data, isLoading, refetch} = useGetCardsQuery();
  const [deleteCard] = useDeleteCardMutation();

  const handleDeleteCard = (id: string) => {
    Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
      {text: 'No, Cancel'},
      {
        onPress: async () => {
          try {
            const res = await deleteCard(id).unwrap();
            if (res.success) {
              RenderSnackbar({text: 'Delete Card'});
            }
          } catch (error) {
            RenderSnackbar({text: `Couldn't Delete Card`});
          }
        },
        text: 'Yes, Delete',
      },
    ]);
  };

  useEffect(() => {
    refetch();
  }, []);

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
        {!!data?.data &&
          data.data.map((x, y) => (
            <SaveCardItem
              key={`card_${x.paymentCardId}`}
              onDelete={id => handleDeleteCard(id as string)}
              expiry={`${x.expiryMonth}/${x.expiryYear}`}
              number={x.maskedCard}
              withDelete
              cardId={x.paymentCardId.toString()}
              cardType={x.cardType.trim() as CardType}
            />
          ))}
      </View>
      <AddCardBtn />
    </ScreenWrapper>
  );
};

export default MyWallet;
