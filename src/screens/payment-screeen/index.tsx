import {MoneyText, ScreenWrapper, Button, DashedDivider} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, ScrollView, Box, HStack, Pressable} from 'native-base';
import React, {useContext} from 'react';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import rider from '@images/rider.png';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from '../request-delivery/components/SelectPaymentMethod';
import RiderInfo from '../request-delivery/components/RiderInfo';
import RequestLocations from '../request-delivery/components/RequestLocations';
import {PackageDetail} from '../request-delivery/request-preview';
import {moneyFormat} from '@components/MoneyText';
import PaymentMethodSection from './components/PaymentMethodSection';
import {RequestContext} from '@contexts/RequestContext';
import AddNewCardSheet from '../wallet/component/AddNewCard';
import BottomSheet from '@gorhom/bottom-sheet';
import MapSection from '@screens/request-delivery/components/MapSection';
import {STATUSBAR_HEIGHT} from '@utils/constant';
import AddCardBtn from './components/AddCardBtn';

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
  const addNewRef = React.useRef<BottomSheet>(null);

  return (
    <ScreenWrapper barColor="white" barStyle="dark-content" translucentBar>
      <ScrollView bounces={false}>
        <View h={hp(100) + STATUSBAR_HEIGHT} w="full">
          <MapSection height={hp(100)} />
        </View>
        <View px="10px" pt="10px" bg="bg" position="absolute" bottom="0" borderTopRadius="2xl" w="full" minH={hp(70)}>
          <View my="10px" px="20px">
            <Text textAlign="center" bold mb="4px">
              RIDER HAS ARRIVED FOR PICKUP!
            </Text>
            <Text textAlign="center" fontSize={hp(1.3)}>
              To activate delivery tracking, you will need to make payment for the dispatcher’s service
            </Text>
          </View>
          {/* selected payment method */}
          <PaymentMethodSection method={paymentMethod} />
          {paymentMethod == 'Card' && <AddCardBtn onPress={() => addNewRef.current?.snapToIndex(0)} />}
          <Box>
            {/* comoany info */}
            <DashedDivider />
            <HStack h="50px" mt="10px" alignItems="center" justifyContent="space-between" px="10px">
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
            <RiderInfo image={rider} fullname="Adeola Adebimpe" plateNo="GTY67809" rating={3} />
            <RequestLocations pickUp="26, Obafemi Awolowo Road" deliveryLocations={['Murtala Mohammed Internationational Airport Lagos', 'Bayeku Igbogbo Ikorodu, Ikorodu, Lagos']} />
            <DashedDivider />
            <ScrollView h="100px" showsVerticalScrollIndicator={false}>
              {packageBrief.map((item, key) => (
                <PackageDetail key={key} {...item} index={key + 1} />
              ))}
            </ScrollView>
            <DashedDivider />
          </Box>
          {/* bottom button */}
          <HStack bottom="0" alignItems="center" justifyContent="space-between" mb="10px" mt="5%" px="10px">
            <Button bg="black" title="Cancel Pickup" w={paymentMethod == 'Cash' ? 'full' : '48%'} onPress={() => navigation.navigate('package_status')} />
            {paymentMethod != 'Cash' && <Button title={`Pady \u20A6 ${moneyFormat(amount)}`} w="48%" onPress={() => navigation.navigate('package_status')} />}
          </HStack>
        </View>
        <AddNewCardSheet ref={addNewRef} onClose={() => addNewRef.current?.close()} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentScreen;