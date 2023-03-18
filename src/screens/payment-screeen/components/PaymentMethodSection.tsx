import {View, Text, Center, HStack, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {PaymentMethod} from '@models/delivery';
import {Image, ImageBackground, Pressable} from 'react-native';
import walletBg from '@images/wallet-bg.png';
import {MoneyText, SaveCardItem} from '@components';
import cash from '@images/illustrations/cash-on-delivery.png';
import InfoGradient from '@components/icons/info-gradient';
import {useGetCardsQuery} from '@services/rtk-queries/payments';
import {CardType} from '@components/CreditCardLogo';
import {useGetWalletBalanceQuery} from '@services/rtk-queries/wallet';
import { WalletData } from '@models/wallet';

type Props = {
  method: PaymentMethod;
  onChangeCard?: (cardId: number) => void;
  selectedCardId?: number;
};

export const Wallet = () => {
  const {data, refetch} = useGetWalletBalanceQuery();
  const balance = data?.data as WalletData;

  useEffect(() => {
    refetch();
  }, []);
  return (
    <View w="full" h="100px">
      <ImageBackground
        source={walletBg}
        style={{width: '100%', height: '100%', justifyContent: 'center'}}
        resizeMode="contain">
        <Center>
          <Text fontSize={'13px'} color="white">
            Wallet Balance
          </Text>
          <MoneyText
            moneyValue={parseFloat(balance?.accountBalance) / 100}
            fontWeight="600"
            fontSize="20px"
            color="white"
          />
        </Center>
      </ImageBackground>
    </View>
  );
};

const PaymentMethodSection = ({
  method,
  selectedCardId,
  onChangeCard,
}: Props) => {
  const Cash = () => {
    return (
      <View w="full">
        <Image
          source={cash}
          style={{
            alignSelf: 'center',
            height: 70,
            width: 100,
            resizeMode: 'contain',
          }}
        />
        <HStack justifyContent="center" alignItems="center" my="5px" space="2">
          <InfoGradient />
          <Text fontSize="12px" flexWrap="wrap" w="80%">
            Rider has to confirm from his application that full payment has been
            made in cash.
          </Text>
        </HStack>
      </View>
    );
  };

  const Card = () => {
    const {data} = useGetCardsQuery();
    return (
      <VStack space="2" w="full">
        {!!data &&
          data.map((x, y) => {
            return (
              // @ts-ignore
              <Pressable
                key={`card_${x.paymentCardId}`}
                // @ts-ignore
                onPress={() => onChangeCard(x.paymentCardId)}>
                <SaveCardItem
                  expiry={`${x.expiryMonth}/${x.expiryYear}`}
                  number={x.maskedCard}
                  cardId={x.paymentCardId.toString()}
                  cardType={x.cardType.trim() as CardType}
                  selected={x.paymentCardId == selectedCardId}
                />
              </Pressable>
            );
          })}
      </VStack>
    );
  };

  const renderMethod = () => {
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
      {renderMethod()}
    </View>
  );
};

export default PaymentMethodSection;
