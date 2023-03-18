import {Alert, Modal, Switch, TouchableNativeFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, useTheme, Pressable} from 'native-base';
import {wp, hp} from '@utils/responsive';
import {useGetCardsQuery} from '@services/rtk-queries/payments';
import {Button, RenderSnackbar, SaveCardItem, TextInput} from '@components';
import {CardType} from '@components/CreditCardLogo';
import {useFundWithSaveCardMutation} from '@services/rtk-queries/wallet';
import AddCardBtn from '@screens/payment-screeen/components/AddCardBtn';
import {moneyFormat} from '@components/MoneyText';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const FundWalletSheet = ({isVisible, onClose}: Props) => {
  const {colors} = useTheme();
  const {data, refetch} = useGetCardsQuery();
  const [card, setCard] = useState<number>();
  const [amount, setAmount] = useState('');
  const [fundWallet, {isLoading}] = useFundWithSaveCardMutation();
  const [useSavedCard, setUseSavedCard] = useState(true);

  const handleProceed = async () => {
    const amt = parseInt(amount);
    if (card == undefined) {
      RenderSnackbar({
        text: 'Please select a card',
      });
      return;
    }

    if (amt == 0 || isNaN(amt)) {
      RenderSnackbar({
        text: 'Please enter amount you want to fund your wallet with',
      });
      return;
    }
    if (amt < 1000) {
      RenderSnackbar({text: 'Please enter amount greater than 500'});
      return;
    }
    try {
      const res = await fundWallet({
        amount: parseInt(amount) * 100,
        cardId: card as number,
      }).unwrap();
      if (res.success) {
        Alert.alert(
          'Wallet Funded',
          `You have successfully funded your wallet with ${moneyFormat(
            amount,
          )} 🎉🎉 🎉`,
        );
      } else {
        RenderSnackbar({
          text: `Sorry we couldn't fund you wallet, Please Try Again`,
        });
      }
    } catch (error) {
      RenderSnackbar({
        text: `Sorry we couldn't fund you wallet, Please Try Again`,
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={onClose}
      visible={isVisible}>
      <View
        style={{
          width: wp(100),
          height: hp(100),
          backgroundColor: 'rgba(0,0,0,.4)',
        }}>
        <Pressable style={{flex: 1}} onPress={onClose} />
        <View
          style={{
            width: wp(100),
            height: hp(60),
            backgroundColor: '#fafafa',
            paddingTop: 20,
            paddingHorizontal: 20,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <Text mb="20px" bold textAlign="center" fontSize="lg">
            Fund Wallet
          </Text>
          <TextInput
            value={amount}
            onChange={setAmount}
            keyboardType="number-pad"
            placeholder="Enter Amount"
          />
          <TouchableNativeFeedback>
            <View
              style={{
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text mb="5px" fontWeight="600">
                Use a Save Card
              </Text>
              <Switch
                trackColor={{false: colors.gray[300], true: colors.gray[300]}}
                thumbColor={useSavedCard ? colors.main : colors.bg}
                onValueChange={setUseSavedCard}
                value={useSavedCard}
              />
            </View>
          </TouchableNativeFeedback>
          {useSavedCard ? (
            <View mt="3%">
              {!!data && data.length > 0 ? (
                data.map((x, y) => (
                  <Pressable
                    key={`card_${x.paymentCardId}`}
                    onPress={() => setCard(x?.paymentCardId)}>
                    <SaveCardItem
                      expiry={`${x.expiryMonth}/${x.expiryYear}`}
                      number={x.maskedCard}
                      cardId={x.paymentCardId.toString()}
                      cardType={x.cardType.trim() as CardType}
                      selected={card == x?.paymentCardId}
                    />
                  </Pressable>
                ))
              ) : (
                <Text bold textAlign="center">
                  You have No Save Card
                </Text>
              )}
            </View>
          ) : (
            <AddCardBtn payFor="wallet" amount={parseInt(amount)} />
          )}
          {useSavedCard && (data?.length as number) > 0 && (
            <Button
              mt="20px"
              title="Fund Wallet"
              onPress={handleProceed}
              isLoading={isLoading}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FundWalletSheet;
