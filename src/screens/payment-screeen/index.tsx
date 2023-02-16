import {MoneyText, ScreenWrapper, Button, DashedDivider, RenderSnackbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, ScrollView, Box, HStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import riderImage from '@images/rider.png';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from '../request-delivery/components/SelectPaymentMethod';
import RiderInfo from '../request-delivery/components/RiderInfo';
import RequestLocations from '../request-delivery/components/RequestLocations';
import {PackageDetail} from '../request-delivery/request-preview';
import {moneyFormat} from '@components/MoneyText';
import PaymentMethodSection from './components/PaymentMethodSection';
import AddNewCardSheet from '../wallet/component/AddNewCard';
import BottomSheet from '@gorhom/bottom-sheet';
import MapSection from '@screens/request-delivery/components/MapSection';
import {STATUSBAR_HEIGHT} from '@utils/constant';
import AddCardBtn from './components/AddCardBtn';
import {RouteProp} from '@react-navigation/native';
import deliveryService from '@services/Delivery';

interface IProps {
  navigation: StackNavigationProp<GuardStackParamList, 'payment_screen'>;
  route: RouteProp<GuardStackParamList, 'payment_screen'>;
}

const PaymentScreen = ({navigation, route}: IProps) => {
  const addNewRef = React.useRef<BottomSheet>(null);
  const {paid, delivery_locations, paymentChannel, pickupLocation, rider, totalAmount, delivery_packages, pickupRequestId} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const deliveryLocations = useMemo(() => {
    return delivery_locations.map(x => {
      return x.address;
    });
  }, []);

  const handleCancelPickup = async () => {
    try {
      setIsLoading(true);
      const res = await deliveryService.cancelPickupRequest(pickupRequestId.toString());
      if (res?.success) {
        navigation.navigate('select_rider');
        setIsLoading(false);
      }
    } catch (error) {
      RenderSnackbar({text: `We couldn't process your request, Please try again`});
      setIsLoading(false);
    }
  };

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
          <PaymentMethodSection method={paymentChannel} />
          {paymentChannel == 'card' && <AddCardBtn onPress={() => addNewRef.current?.snapToIndex(0)} />}
          <Box>
            {/* comoany info */}
            <DashedDivider /> {/* TODO: COMPANY INFO LOGO AND RIDER IMAGE */}
            <HStack h="50px" mt="10px" justifyContent="space-between" px="10px">
              <Image source={logo} alt="company logo" rounded="full" bg="gray.400" size="50px" />
              <View w="60%">
                <Text fontSize={hp(1.3)} fontWeight="600">
                  {rider.company.name}
                </Text>
              </View>
              <View justifyContent="center" alignItems="center" w="20%">
                <HStack alignItems="center" space="1">
                  <PaymentMethodIcon method={paymentChannel} selected={false} />
                  <Text>{paymentChannel}</Text>
                </HStack>
                <MoneyText bold moneyValue={totalAmount} />
              </View>
            </HStack>
            <DashedDivider />
            {/* rider info */} {/* TODO: RIDER IMAGE */}
            <RiderInfo
              image={riderImage}
              fullname={`${rider.user.firstName} ${rider.user.lastName}`}
              plateNo={rider.bikeDetails.licenseNumber}
              rating={rider.rating}
            />
            <RequestLocations pickUp={pickupLocation.address} deliveryLocations={deliveryLocations} />
            <DashedDivider />
            <ScrollView h="100px" showsVerticalScrollIndicator={false}>
              {delivery_packages &&
                delivery_packages.map((i, k) => {
                  return (
                    <React.Fragment key={k}>
                      <PackageDetail
                        index={k + 1}
                        contactName={i.recipient.name}
                        contactPhone={i.recipient.phone}
                        packageType={i.packageCategories}
                        instruction={i.deliveryInstructions}
                      />
                    </React.Fragment>
                  );
                })}
            </ScrollView>
            <DashedDivider />
          </Box>
          {/* bottom button */}
          <HStack bottom="0" alignItems="center" justifyContent="space-between" mb="10px" mt="5%" px="10px">
            <Button
              bg="black"
              title="Cancel Pickup"
              isLoading={isLoading}
              w={paymentChannel == 'cash' ? 'full' : '48%'}
              onPress={handleCancelPickup}
            />
            {paymentChannel != 'cash' && (
              <Button title={`Pay \u20A6 ${moneyFormat(totalAmount)}`} w="48%" onPress={() => navigation.navigate('package_status')} />
            )}
          </HStack>
        </View>
        <AddNewCardSheet ref={addNewRef} onClose={() => addNewRef.current?.close()} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
