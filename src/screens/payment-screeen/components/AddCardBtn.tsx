import {ActivityModal, RenderSnackbar} from '@components';
import PaystackModal from '@screens/wallet/sheets/paystack-modal';
import paymentService from '@services/Payment';
import {useAddCardMutation} from '@services/rtk-queries/payments';
import {Pressable, Text} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
// @ts-ignore
import {paystackProps} from 'react-native-paystack-webview';

type AddCardBtnProps = Partial<{
  chargeCard: boolean;
  pickupId: string;
  amount: number;
}>;

const AddCardBtn = ({
  chargeCard = false,
  pickupId,
  amount,
}: AddCardBtnProps) => {
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [transRef, setTransRef] = useState('');
  const [addNewCard, {isLoading, error}] = useAddCardMutation();
  const saveCard = useRef(false);
  const chargeAmount = chargeCard ? (amount as number) : 10;

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

  const initPayment = useCallback(async () => {
    if (chargeCard) {
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

      return;
    }
    paystackInitialization();
  }, []);

  const paystackInitialization = async () => {
    try {
      setIsInitializing(true);
      const res = await paymentService.initializeCard(chargeAmount.toString());
      if (res?.success) {
        setTransRef(res.data?.reference as string);
        paystackWebViewRef.current.startTransaction();
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

  const onPaystackDone = (reference: string) => {
    if (chargeCard) {
      handlePayment(reference);
    } else {
      handleAddNewCard(reference);
    }
  };

  return (
    <>
      <Pressable
        onPress={initPayment}
        justifyContent="space-between"
        flexDirection="row"
        h="20px"
        w="95px"
        alignItems="center">
        <Text fontWeight="600" fontSize="11px" color="main">
          +
        </Text>
        <Text underline fontWeight="600" fontSize="11px" color="main">
          {chargeCard ? 'Pay With New Card' : 'Add New Card'}
        </Text>
      </Pressable>
      <PaystackModal
        ref={paystackWebViewRef}
        transRef={transRef}
        onCancel={() => {
          setTransRef('');
        }}
        amount={chargeAmount}
        onDone={d => onPaystackDone(d.transactionRef.reference)}
      />
      <ActivityModal isLoading={isLoading || isInitializing} />
    </>
  );
};

export default AddCardBtn;
