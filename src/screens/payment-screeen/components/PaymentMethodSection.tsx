import {View, Text, Center, HStack, VStack} from 'native-base';
import React from 'react';
import {PaymentMethod} from '@models/delivery';
import {Image, ImageBackground} from 'react-native';
import walletBg from '@images/wallet-bg.png';
import {MoneyText, SaveCardItem} from '@components';
import cash from '@images/illustrations/cash-on-delivery.png';
import InfoGradient from '@components/icons/info-gradient';

type Props = {
  method: PaymentMethod;
};

export const Wallet = () => {
  return (
    <View w="full" h="100px">
      <ImageBackground source={walletBg} style={{width: '100%', height: '100%', justifyContent: 'center'}} resizeMode="contain">
        <Center>
          <Text fontSize={'13px'} color="white">
            Wallet Balance
          </Text>
          <MoneyText moneyValue={50000} fontWeight="600" fontSize="20px" color="white" />
        </Center>
      </ImageBackground>
    </View>
  );
};

const PaymentMethodSection = ({method}: Props) => {
  const Cash = () => {
    return (
      <View w="full">
        <Image source={cash} style={{alignSelf: 'center', height: 70, width: 100, resizeMode: 'contain'}} />
        <HStack justifyContent="center" alignItems="center" my="5px" space="2">
          <InfoGradient />
          <Text fontSize="12px" flexWrap="wrap" w="80%">
            Rider has to confirm from his application that full payment has been made in cash.
          </Text>
        </HStack>
      </View>
    );
  };

  const Card = () => {
    return (
      <VStack space="2" w="full">
        <SaveCardItem selected number="4187427415564246" expiry="10/27" />
        <SaveCardItem selected={false} number="4187427415564246" expiry="10/27" />
      </VStack>
    );
  };

  const renderMethodBanner = () => {
    if (method == 'card') {
      return <Card />;
    }
    if (method == 'cash') {
      return <Cash />;
    }
    if (method == 'wallet') {
      return <Wallet />;
    }
  };
  return (
    <View px="10px" w="full">
      {renderMethodBanner()}
    </View>
  );
};

export default PaymentMethodSection;
