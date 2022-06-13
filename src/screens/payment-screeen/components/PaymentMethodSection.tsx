import {View, Text, Center, HStack} from 'native-base';
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

const PaymentMethodSection = ({method}: Props) => {
  const Wallet = () => {
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
      <HStack w="full">
        <SaveCardItem />
      </HStack>
    );
  };
  const renderMethodBanner = () => {
    if (method == 'Card') {
      return <Card />;
    }
    if (method == 'Cash') {
      return <Cash />;
    }
    if (method == 'Wallet') {
      return <Wallet />;
    }
  };
  return <View w="full">{renderMethodBanner()}</View>;
};

export default PaymentMethodSection;
