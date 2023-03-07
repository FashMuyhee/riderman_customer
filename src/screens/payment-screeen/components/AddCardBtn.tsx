import PaystackModal from '@screens/wallet/sheets/paystack-modal';
import paymentService from '@services/Payment';
import {useAddCardMutation} from '@services/rtk-queries/payments';
import {Pressable, Text} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
// @ts-ignore
import {paystackProps} from 'react-native-paystack-webview';

const AddCardBtn = () => {
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  const [isInitializing, setIsInitializing] = useState(false);
  const [transRef, setTransRef] = useState('');
  const [addNewCard, {isLoading}] = useAddCardMutation();

  const initPayment = useCallback(async () => {
    setIsInitializing(true);
    try {
      const res = await paymentService.initializeCard();
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
  }, []);

  const onAddNewCard = async (reference: string) => {
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
          {isLoading || isInitializing ? 'Loading...' : ' Add New Card'}
        </Text>
      </Pressable>
      <PaystackModal
        ref={paystackWebViewRef}
        transRef={transRef}
        onCancel={() => {
          setTransRef('');
          console.log('cancelled');
        }}
        onDone={d => onAddNewCard(d.transactionRef.reference)}
      />
    </>
  );
};

export default AddCardBtn;
