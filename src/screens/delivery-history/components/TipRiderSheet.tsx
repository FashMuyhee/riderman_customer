import React, {useMemo} from 'react';
import {HStack, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import riderLogo from '@images/illustrations/riderman-sm.png';
import {DashedDivider, SaveCardItem, TextInput} from '@components';
import {Image as RNImage} from 'react-native';
import NairaMoneyIcon from '@components/icons/naira-money';
import AddCardBtn from '@screens/payment-screeen/components/AddCardBtn';
import Checkbox from '@components/icons/checkbox';
import {moneyFormat} from '@components/MoneyText';

const WalletItem = ({selected}: {selected: boolean}) => {
  return (
    <HStack mb="10px" bg="white" shadow="2" justifyContent="space-between" alignItems="center" w="full" py="5px" px="10px" h="60px" borderWidth={selected ? 1 : 0} borderColor="main" rounded="lg">
      <View w="15%">
        <RNImage source={riderLogo} style={{width: 40, height: 40, resizeMode: 'center'}} />
      </View>
      <View w="80%">
        <Text bold fontSize="13px">
          KiaKia Wallet
        </Text>
        <Text fontSize="11px" fontWeight="light" color="grey.200">
          {moneyFormat(50000, true) + ' available'}
        </Text>
      </View>
      <View alignSelf="center">{selected && <Checkbox />}</View>
    </HStack>
  );
};

const TipRiderSheet = React.forwardRef<BottomSheet, {onClose: () => void}>(({onClose}, ref) => {
  const snapPoints = useMemo(() => ['70%'], []);

  return (
    <BottomSheetWrapperSnappy bgColor="#fafafa" noIndicator showBackdrop index={-1} ref={ref} snapPoints={snapPoints}>
      <View>
        <HStack w="full" alignItems="center" justifyContent="space-between" px="20px">
          <View w="1/3">
            <Text onPress={onClose} color="main" textAlign="left">
              Cancel
            </Text>
          </View>
          <View w="1/3">
            <Text fontSize={hp(1.5)} textAlign="center" fontWeight="semibold">
              TIP RIDER
            </Text>
          </View>
          <View w="1/3" />
        </HStack>
        <DashedDivider mt="5px" />
      </View>
      <View mt="7%" px="20px">
        <TextInput leftIcon={<NairaMoneyIcon />} leftIconDivider placeholder="Enter amount" />
        <Text bold mt="10px">
          Select Payment Method
        </Text>
        <View mt="15px">
          <WalletItem selected />
          <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" />
          <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" />
          <AddCardBtn onPress={() => {}} />
        </View>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default TipRiderSheet;
