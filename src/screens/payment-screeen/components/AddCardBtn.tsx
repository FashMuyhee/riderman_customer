import {ActivityModal, RenderSnackbar} from '@components';
import {moneyFormat} from '@components/MoneyText';
import PaystackModal from '@screens/wallet/sheets/paystack-modal';
import paymentService from '@services/Payment';
import {useAddCardMutation} from '@services/rtk-queries/payments';
import {useFundWithNewCardMutation} from '@services/rtk-queries/wallet';
import {Pressable, Text} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
// @ts-ignore
import {paystackProps} from 'react-native-paystack-webview';

type AddCardBtnProps = {
  payFor: 'wallet' | 'delivery';
  pickupId?: string;
  amount: number;
};

const AddCardBtn = ({payFor, pickupId, amount}: AddCardBtnProps) => {
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [transRef, setTransRef] = useState('');
  const [addNewCard, {isLoading, error}] = useAddCardMutation();
  const saveCard = useRef(false);
  const [fundWallet, {isLoading: isFunding}] = useFundWithNewCardMutation();

  const handlePayment = async (refNo: string) => {
    try {
      const res = await paymentService.makePaymentWithNewCard(
        pickupId as string,
        refNo,
        saveCard.current,
      );
      if (res?.success) {
        RenderSnackbar({text: 'Payment Successful', duration: 'LONG'});
      } else {
        RenderSnackbar({
          text: `Couldn't Complete Payment,Please Try Another Method`,
          duration: 'LONG',
        });
      }
    } catch (error) {
      RenderSnackbar({
        text: `Couldn't Complete Payment,Please Try Another Method`,
        duration: 'LONG',
      });
    }
  };

  const initPayment = async () => {
    if (payFor == 'wallet') {
      if (amount == 0 || isNaN(amount)) {
        RenderSnackbar({
          text: 'Please enter amount you want to fund your wallet with',
        });
        return;
      }
      if (amount < 500) {
        RenderSnackbar({text: 'Please enter amount greater than 500'});
        return;
      }
    }
    Alert.alert(
      'Save Card',
      'Do you wish to save this card for future reference',
      [
        {
          text: 'No',
          onPress: () => {
            saveCard.current = false;
            paystackInitialization();
          },
        },
        {
          onPress: () => {
            saveCard.current = true;
            paystackInitialization();
          },
          text: 'Yes',
        },
      ],
    );
  };

  const paystackInitialization = async () => {
    try {
      setIsInitializing(true);
      const res = await paymentService.initializeCard(amount?.toString());
      if (res?.success) {
        setTransRef(res.data?.reference as string);
        //@ts-ignore
        paystackWebViewRef?.current.startTransaction();
        setIsInitializing(false);
      } else {
        setIsInitializing(false);
      }
    } catch (error) {
      setIsInitializing(false);
    }
  };

  const handleAddNewCard = async (reference: string) => {
    try {
      const res = await addNewCard({reference}).unwrap();
      if (res.success) {
        console.log(res.message);
      }
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    }
  };

  const handleFundWallet = async (reference: string) => {
    try {
      const res = await fundWallet({
        reference,
        saveCard: saveCard.current,
      }).unwrap();
      if (res.success) {
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
      }
    } catch (error) {
      // @ts-ignore
      console.log(error.message);
    }
  };

  const onPaystackDone = (reference: string) => {
    if (payFor == 'delivery') {
      handlePayment(reference);
      return;
    }
    if (payFor == 'wallet') {
      handleFundWallet(reference);
      return;
    }
  };

  return (
    <>
      <Pressable
        onPress={initPayment}
        flexDirection="row"
        h="20px"
        minW="90px"
        maxW="150px"
        alignItems="center">
        <Text fontWeight="600" mr="10px" fontSize="13px" color="main">
          +
        </Text>
        <Text fontWeight="600" fontSize="13px" color="main">
          {payFor == 'delivery' ? 'Pay With New Card' : 'Fund With New Card'}
        </Text>
      </Pressable>
      <PaystackModal
        ref={paystackWebViewRef}
        transRef={transRef}
        onCancel={() => {
          setTransRef('');
        }}
        amount={amount}
        onDone={d => onPaystackDone(d.transactionRef.reference)}
      />
      <ActivityModal isLoading={isFunding || isInitializing} />
    </>
  );
};

export default AddCardBtn;
