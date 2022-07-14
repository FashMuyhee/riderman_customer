import {MoneyText, ScreenWrapper, Button, DashedDivider} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, ScrollView, Box, HStack} from 'native-base';
import React, {useContext} from 'react';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import rider from '@images/rider.png';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from '../request-delivery/components/SelectPaymentMethod';
import RiderBrief from '../request-delivery/components/RiderBrief';
import RequestLocations from '../request-delivery/components/RequestLocations';
import {PackageBrief} from '../request-delivery/request-preview';
import {moneyFormat} from '@components/MoneyText';
import PaymentMethodSection from './components/PaymentMethodSection';
import {RequestContext} from '@contexts/RequestContext';

interface IProps {
  navigation: StackNavigationProp<GuardStackParamList, 'payment_screen'>;
}

const PaymentScreen = ({navigation}: IProps) => {
  const packageBrief = [
    {
      contactPhone: '0801 234 5678',
      contactName: 'Jonathan Jude',
      packageType: ['Cloth', 'Food'],
    },
    {
      contactPhone: '0801 234 5678',
      contactName: 'Nancy Wheeler',
      packageType: ['Bag', 'Shoe'],
    },
  ];
  const {amount, paymentMethod} = useContext(RequestContext);

  return (
    <ScreenWrapper barColor="white" barStyle="dark-content">
      <ScrollView bounces={false}>
        <View h={hp(100)} w="full" bg="red.200" />
        <View px="10px" pt="10px" bg="teal.600" position="absolute" bottom="0" borderTopRadius="2xl" w="full" minH={hp(70)}>
          <View my="10px" px="20px">
            <Text textAlign="center" bold mb="4px">
              RIDER HAS ARRIVED FOR PICKUP!
            </Text>
            <Text textAlign="center" fontSize={hp(1.3)}>
              To activate delivery tracking, you will need to make payment for the dispatcher’s service
            </Text>
          </View>
          {/* selected payment method */}
          <PaymentMethodSection method={'Card'} />
          <Box>
            {/* comoany info */}
            <DashedDivider />
            <HStack h="60px" alignItems="center" justifyContent="space-between" px="10px">
              <Image source={logo} alt="company logo" rounded="full" bg="gray.400" size="50px" />
              <View w="60%">
                <Text fontSize={hp(1.3)} fontWeight="600">
                  Rush Delivery Limited
                </Text>
                <HStack mt="10px" alignItems="center" space="2">
                  <TimeSolid />
                  <Text fontSize="12px">3 min away</Text>
                </HStack>
              </View>
              <View justifyContent="center" alignItems="center" w="20%">
                <HStack alignItems="center" space="1">
                  <PaymentMethodIcon method={paymentMethod} selected={false} />
                  <Text>{paymentMethod}</Text>
                </HStack>
                <MoneyText bold moneyValue={amount} />
              </View>
            </HStack>
            <DashedDivider />
            {/* rider info */}
            <RiderBrief image={rider} fullname="Adeola Adebimpe" plateNo="GTY67809" rating={3} />
            <RequestLocations pickUp="26, Obafemi Awolowo Road" deliveryLocations={['Murtala Mohammed Internationational Airport Lagos', 'Bayeku Igbogbo Ikorodu, Ikorodu, Lagos']} />
            <DashedDivider />
            <ScrollView h="110px" showsVerticalScrollIndicator={false}>
              {packageBrief.map((item, key) => (
                <PackageBrief key={key} {...item} index={key + 1} />
              ))}
            </ScrollView>
            <DashedDivider />
          </Box>
          {/* bottom button */}
          <HStack alignItems="center" justifyContent="space-between" mt="5%" px="10px">
            <Button bg="black" title="Cancel Pickup" w={paymentMethod == 'Cash' ? 'full' : '48%'} onPress={() => navigation.navigate('home')} />
            {paymentMethod != 'Cash' && <Button title={`Pay \u20A6 ${moneyFormat(amount)}`} w="48%" />}
          </HStack>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
