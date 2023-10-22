import {View, Text, HStack, useDisclose} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {Button, DashedDivider, RenderSnackbar, SaveCardItem, ScreenWrapper} from '@components';
import {useDeleteCardMutation, useGetCardsQuery} from '@services/rtk-queries/payments';
import {CardType} from '@components/CreditCardLogo';
import {Alert} from 'react-native';
import FundWalletSheet from './sheets/fund-wallet';
import WalletBalance from './components/WalletBalance';
import {SheetManager} from 'react-native-actions-sheet';

const MyWallet = () => {
  const {data, isLoading, refetch} = useGetCardsQuery();
  const [deleteCard] = useDeleteCardMutation();
  const {isOpen, onToggle} = useDisclose();
 

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
      <WalletBalance />
      <HStack mb="10px" mt="10%" alignItems="center" justifyContent="space-between">
        <Button title="Fund Wallet" onPress={onToggle} w="48%" bg="bg" color="black" />
        <Button title="Withdraw" onPress={() => SheetManager.show('withdraw-wallet')} w="48%" bg="black" color="white" />
      </HStack>
      <DashedDivider />
      <Text mt="3%" fontWeight="600" fontSize="12px" color="#263238">
        Saved Cards
      </Text>
      <View mt="5%">
        {!!data && data.length > 0 ? (
          data.map((x, y) => (
            <SaveCardItem
              key={`card_${x.paymentCardId}`}
              onDelete={id => handleDeleteCard(id as string)}
              expiry={`${x.expiryMonth}/${x.expiryYear}`}
              number={x.maskedCard}
              withDelete
              cardId={x.paymentCardId.toString()}
              cardType={x.cardType.trim() as CardType}
            />
          ))
        ) : (
          <Text bold textAlign="center">
            You have No Save Card
          </Text>
        )}
      </View>
      <FundWalletSheet isVisible={isOpen} onClose={onToggle} />
    </ScreenWrapper>
  );
};

export default MyWallet;
