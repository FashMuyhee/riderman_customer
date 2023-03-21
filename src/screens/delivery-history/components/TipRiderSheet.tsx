import React, {useMemo, useState} from 'react';
import {HStack, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import riderLogo from '@images/illustrations/riderman-sm.png';
import {Button, DashedDivider, RenderSnackbar, TextInput} from '@components';
import {Alert, Image as RNImage} from 'react-native';
import NairaMoneyIcon from '@components/icons/naira-money';
import Checkbox from '@components/icons/checkbox';
import {moneyFormat} from '@components/MoneyText';
import {
  useGetWalletBalanceQuery,
  useSendTipToRiderMutation,
} from '@services/rtk-queries/wallet';

const WalletItem = ({selected}: {selected: boolean}) => {
  const {data} = useGetWalletBalanceQuery();
  const balance = parseFloat(data?.data.accountBalance as string) / 100;
  return (
    <HStack
      mb="10px"
      bg="white"
      shadow="2"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      py="5px"
      px="10px"
      h="60px"
      borderWidth={selected ? 1 : 0}
      borderColor="main"
      rounded="lg">
      <View w="15%">
        <RNImage
          source={riderLogo}
          style={{width: 40, height: 40, resizeMode: 'center'}}
        />
      </View>
      <View w="80%">
        <Text bold fontSize="13px">
          Riderman Wallet
        </Text>
        <Text fontSize="11px" fontWeight="light" color="grey.200">
          {moneyFormat(balance, true) + ' available'}
        </Text>
      </View>
      <View alignSelf="center">{selected && <Checkbox />}</View>
    </HStack>
  );
};

const TipRiderSheet = React.forwardRef<
  BottomSheet,
  {onClose: () => void; riderId: string}
>(({onClose, riderId}, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sendTip] = useSendTipToRiderMutation();

  const handleSubmit = async () => {
    if (parseFloat(amount) < 0) {
      RenderSnackbar({
        text: 'Please enter a amount',
      });
    }
    try {
      setIsLoading(true);
      const res = await sendTip({
        amount: parseFloat(amount) * 100,
        riderId,
      }).unwrap();
      if (res.success) {
        Alert.alert(
          'Tip Sent',
          `${moneyFormat(amount)} has been sent to rider wallet`,
        );
      } else {
        RenderSnackbar({
          text: `Sorry, Please Try Again`,
        });
      }
    } catch (error) {
      RenderSnackbar({
        text: `Sorry, Please Try Again`,
      });
    }
  };

  return (
    <BottomSheetWrapperSnappy
      bgColor="#fafafa"
      noIndicator
      showBackdrop
      index={-1}
      ref={ref}
      snapPoints={snapPoints}>
      <View>
        <HStack
          w="full"
          alignItems="center"
          justifyContent="space-between"
          px="20px">
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
        <TextInput
          leftIcon={<NairaMoneyIcon />}
          leftIconDivider
          placeholder="Enter amount"
          value={amount}
          onChange={setAmount}
        />
        <Text bold mt="10px">
          Select Payment Method
        </Text>
        <View mt="15px">
          <WalletItem selected />
          {/* <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" />
          <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" /> */}
          {/* <AddCardBtn onPress={() => {}} /> */}
          <Button
            title="TIP"
            mt="20px"
            onPress={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default TipRiderSheet;
