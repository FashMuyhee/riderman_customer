import {
  MoneyText,
  ScreenWrapper,
  Button,
  DashedDivider,
  RenderSnackbar,
} from '@components';
import {View, Text, Image, ScrollView, Box, HStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import riderImage from '@images/rider.png';
import {PaymentMethodIcon} from '../request-delivery/components/SelectPaymentMethod';
import RiderInfo from '../request-delivery/components/RiderInfo';
import RequestLocations from '../request-delivery/components/RequestLocations';
import {PackageDetail} from '../request-delivery/request-preview';
import {moneyFormat} from '@components/MoneyText';
import PaymentMethodSection from './components/PaymentMethodSection';
import MapSection from '@screens/request-delivery/components/MapSection';
import {STATUSBAR_HEIGHT} from '@utils/constant';
import AddCardBtn from './components/AddCardBtn';
import deliveryService from '@services/Delivery';
import {Modal} from 'react-native';
import {PickupRequestInfo} from '@models/delivery';
import paymentService from '@services/Payment';
import {IGeneralResponse} from '@models/auth';
import {useGetCardsQuery} from '@services/rtk-queries/payments';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GuardStackParamList} from '@navigations/param-list';
import Snackbar from 'react-native-snackbar';

interface IProps {
  pickupInfo: PickupRequestInfo;
  onCancelRequest: () => void;
  onClose: () => void;
  isVisible: boolean;
}
const PaymentScreen = ({
  pickupInfo,
  isVisible,
  onCancelRequest,
  onClose,
}: IProps) => {
  const {
    delivery_locations,
    paymentChannel,
    pickupLocation,
    rider,
    totalAmount,
    delivery_packages,
    pickupRequestId,
  } = pickupInfo;
  const {data} = useGetCardsQuery();
  const cards = !!data ? data : [{paymentCardId: 0}];
  const [isCancelling, setIsCancelling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.paymentCardId);

  const {navigate} = useNavigation<NavigationProp<GuardStackParamList>>();

  const deliveryLocations = useMemo(() => {
    return delivery_locations.map(x => {
      return x.address;
    });
  }, []);

  const handleCancelPickup = async () => {
    try {
      setIsCancelling(true);
      const res = await deliveryService.cancelPickupRequest(
        pickupRequestId.toString(),
      );
      if (res?.success) {
        onCancelRequest();
        setIsCancelling(false);
      }
    } catch (error) {
      RenderSnackbar({
        text: `We couldn't process your request, Please try again`,
      });
      setIsCancelling(false);
    }
  };

  const handlePayment = async () => {
    if (paymentChannel === 'card') {
      if (selectedCardId == 0) {
        RenderSnackbar({text: 'Please select a card or use a new card'});
        return;
      }
    }
    setIsLoading(true);

    try {
      let res: IGeneralResponse | undefined;
      if (paymentChannel === 'wallet') {
        res = await paymentService.makeWalletPayment(
          pickupRequestId.toString(),
        );
      } else {
        res = await paymentService.makePickupPayment({
          method: paymentChannel,
          cardId: selectedCardId.toString(),
          pickupRequestId: pickupRequestId.toString(),
        });
      }
      console.log(res);
      setIsLoading(false);
      if (res?.success) {
        setIsPaid(true);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const payTitle = useMemo(() => {
    return isPaid ? 'Paid' : `Pay \u20A6 ${moneyFormat(totalAmount)}`;
  }, [isPaid]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent>
      <ScreenWrapper barColor="white" barStyle="dark-content" translucentBar>
        <ScrollView bounces={false}>
          <View h={hp(100) + STATUSBAR_HEIGHT} w="full">
            <MapSection height={hp(100)} />
          </View>
          <View
            px="10px"
            pt="10px"
            bg="bg"
            position="absolute"
            bottom="0"
            borderTopRadius="2xl"
            w="full"
            minH={hp(70)}>
            <View my="10px" px="20px">
              <Text textAlign="center" bold mb="4px">
                RIDER HAS ARRIVED FOR PICKUP!
              </Text>
              <Text textAlign="center" fontSize={hp(1.3)}>
                To activate delivery tracking, you will need to make payment for
                the dispatcher’s service
              </Text>
            </View>
            {/* selected payment method */}
            <PaymentMethodSection
              method={paymentChannel}
              onChangeCard={setSelectedCardId}
              selectedCardId={selectedCardId}
            />
            {paymentChannel == 'card' && (
              <AddCardBtn
                amount={totalAmount}
                payFor="delivery"
                pickupId={pickupRequestId.toString()}
              />
            )}
            <Box>
              {/* comoany info */}
              <DashedDivider /> {/* TODO: COMPANY INFO LOGO AND RIDER IMAGE */}
              <HStack
                h="50px"
                mt="10px"
                justifyContent="space-between"
                px="10px">
                <Image
                  source={logo}
                  alt="company logo"
                  rounded="full"
                  bg="gray.400"
                  size="50px"
                />
                <View w="60%">
                  <Text fontSize={hp(1.3)} fontWeight="600">
                    {rider.company.name}
                  </Text>
                </View>
                <View justifyContent="center" alignItems="center" w="20%">
                  <HStack alignItems="center" space="1">
                    <PaymentMethodIcon
                      method={paymentChannel}
                      selected={false}
                    />
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
              <RequestLocations
                pickUp={pickupLocation.address}
                deliveryLocations={deliveryLocations}
              />
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
            <HStack
              bottom="0"
              alignItems="center"
              justifyContent="space-between"
              mb="10px"
              mt="5%"
              px="10px">
              <Button
                bg="black"
                title="Cancel Pickup"
                isLoading={isCancelling}
                w="48%"
                onPress={handleCancelPickup}
              />
              <Button
                title={payTitle}
                isLoading={isLoading}
                w="48%"
                onPress={handlePayment}
              />
            </HStack>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </Modal>
  );
};

export default PaymentScreen;
