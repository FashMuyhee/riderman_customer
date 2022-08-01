import React, {useMemo, useState} from 'react';
import {HStack, Text, View, Image, Badge} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Button, CreditCardLogo, DashedDivider, TextInput} from '@components';
import {Masks, useMaskedInputProps} from 'react-native-mask-input';
import CreditCardIcon from '@components/icons/credit-card';
import {wp} from '@utils/responsive';

export interface IProps {
  onClose: () => void;
}

const AddNewCardSheet = React.forwardRef<BottomSheet, IProps>(({onClose}, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');

  const maskCreditCard = useMaskedInputProps({
    value: cardNumber,
    onChangeText: setCardNumber,
    mask: Masks.CREDIT_CARD,
  });

  const expiryMask = [/\d/, /\d/, '/', /\d/, /\d/];
  const cvvMask = [/\d/, /\d/, /\d/];

  const maskExpiry = useMaskedInputProps({
    value: expiry,
    onChangeText: setExpiry,
    mask: expiryMask,
  });

  const maskCVV = useMaskedInputProps({
    value: cvv,
    onChangeText: setCVV,
    mask: cvvMask,
  });

  return (
    <BottomSheetWrapperSnappy showBackdrop noIndicator index={-1} ref={ref} snapPoints={snapPoints}>
      <View px="25px" w="full" h="full">
        <HStack justifyContent="space-between">
          <Text onPress={onClose} w="20%" color="main">
            Cancel
          </Text>
          <Text w="40%" alignSelf="center" textAlign="center" fontWeight="semibold">
            ADD NEW CARD
          </Text>
          <View w="20%" />
        </HStack>
        <DashedDivider />
        <View w="full" mt="5%">
          <TextInput labelColor="grey.200" label="CARD NUMBER" leftIcon={<CreditCardIcon selected={false} />} keyboardType="numeric" {...maskCreditCard} onChange={maskCreditCard.onChangeText} />
          <HStack space="2" mt="10px">
            <TextInput textAlign="center" w="48%" labelColor="grey.200" label="EXPIRY DATE" keyboardType="numeric" {...maskExpiry} onChange={maskExpiry.onChangeText} />
            <TextInput textAlign="center" w="48%" labelColor="grey.200" label="SECURITY CODE" keyboardType="numeric" {...maskCVV} onChange={maskCVV.onChangeText} />
          </HStack>
        </View>
        <View style={{position: 'absolute', bottom: 20, width: wp(95), alignSelf: 'center'}}>
          <Text fontSize="12px" mb="10px" color="grey.200">
            Your card details are extremely safe and are warehoused where they can never be compromosed.
          </Text>
          <Button title="Save" onPress={onClose} />
        </View>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default AddNewCardSheet;
