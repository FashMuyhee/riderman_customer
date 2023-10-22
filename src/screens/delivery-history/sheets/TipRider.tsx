import React, {useState} from 'react';
import {HStack, Text, View} from 'native-base';
import {hp} from '@utils/responsive';
import riderLogo from '@images/illustrations/riderman-sm.png';
import {Button, DashedDivider, RenderSnackbar, SheetNavigationHeader, TextInput} from '@components';
import {Alert, Image as RNImage} from 'react-native';
import NairaMoneyIcon from '@components/icons/naira-money';
import Checkbox from '@components/icons/checkbox';
import {moneyFormat} from '@components/MoneyText';
import {useGetWalletBalanceQuery, useSendTipToRiderMutation} from '@services/rtk-queries/wallet';
import {RouteScreenProps} from 'react-native-actions-sheet';

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
        <RNImage source={riderLogo} style={{width: 40, height: 40, resizeMode: 'center'}} />
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

export const TipRiderSheet = ({params, router}: RouteScreenProps) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendTip] = useSendTipToRiderMutation();
  const riderId = params as string;

  const onClose = () => {
    router?.goBack();
  };

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
      setIsLoading(false);
      if (res.success) {
        setAmount('');
        onClose();
        Alert.alert('Tip Sent', `${moneyFormat(amount)} has been sent to rider wallet`);
      } else {
        RenderSnackbar({
          text: `Sorry, Please Try Again`,
        });
      }
    } catch (error) {
      setIsLoading(false);
      RenderSnackbar({
        text: `Sorry, Please Try Again`,
      });
    }
  };

  return (
    <View h="full">
      <SheetNavigationHeader title="Tip Rider" onClose={() => router.goBack()} />
      <View mt="7%" px="20px">
        <TextInput
          leftIcon={<NairaMoneyIcon />}
          leftIconDivider
          placeholder="Enter amount"
          value={amount}
          onChange={setAmount}
          keyboardType="number-pad"
        />
        <Text bold mt="10px">
          Select Payment Method
        </Text>
        <View mt="15px">
          <WalletItem selected />
          {/* <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" />
          <SaveCardItem bgColor="white" shadow expiry="01/20" cardId="1" number="5503847384847893" /> */}
          {/* <AddCardBtn onPress={() => {}} /> */}
          <Button title="TIP" mt="20px" onPress={handleSubmit} isLoading={isLoading} />
        </View>
      </View>
    </View>
  );
};
