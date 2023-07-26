import {View, Text, Heading, HStack} from 'native-base';
import React, {useEffect} from 'react';
import {WalletData} from '@models/wallet';
import {useGetWalletBalanceQuery} from '@services/rtk-queries/wallet';
import {Center} from 'native-base';
import {moneyFormat} from '@components/MoneyText';

const WalletBalance = () => {
  const {data, refetch} = useGetWalletBalanceQuery();
  const walletInfo = data?.data as WalletData;

  useEffect(() => {
    refetch();
  }, []);

  const RoundLabel = ({title, value}: {title: string; value: string}) => (
    <View
      bg="gray.200"
      h="70px"
      w="45%"
      borderColor="white"
      alignItems="center"
      justifyContent="center"
      px="10px"
      borderWidth={1}
      rounded="5px">
      <Text bold textTransform="uppercase" color="main">
        {title}
      </Text>
      <Text>{value}</Text>
    </View>
  );

  return (
    <View h="200px">
      <Center bg="main" h="100px" rounded="lg" w="full">
        <Heading color="white" fontSize="lg">
          Wallet Balance
        </Heading>
        <Heading color="white" mt="10px">
          {moneyFormat(parseFloat(walletInfo?.accountBalance) / 100, true)}
        </Heading>
      </Center>
      <Text textTransform="uppercase" textAlign="center" mt="10px">
        Wallet Information
      </Text>
      <HStack mt="10px" justifyContent="space-between">
        <RoundLabel title="Bank" value={walletInfo?.bank.name} />
        <RoundLabel title="Account Number" value={walletInfo?.accountNumber} />
      </HStack>
    </View>
  );
};

export default WalletBalance;
