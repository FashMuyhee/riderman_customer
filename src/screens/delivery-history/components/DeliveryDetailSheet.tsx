import React, {useMemo} from 'react';
import {HStack, Text, View, Image} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import nairaCoin from '@images/icons/naira-coin.png';
import {Button, DashedDivider, MoneyText, RenderSnackbar} from '@components';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from '@screens/request-delivery/components/SelectPaymentMethod';
import RiderInfo from '@screens/request-delivery/components/RiderInfo';
import RequestLocations from '@screens/request-delivery/components/RequestLocations';
import {PackageDetail} from '@screens/request-delivery/request-preview';
import CallIcon from '@components/icons/call';
import {DeliveryStatus, IDeliveryItem} from '@models/delivery';
import {Image as RNImage} from 'react-native';
import openDialer from '@utils/open-dialer';
import {useConfirmDeliveryMutation} from '@services/rtk-queries/deliveries';

type Props = {
  item: IDeliveryItem;
  onClose: () => void;
  deliveryStatus: DeliveryStatus;
  handleTipRider: () => void;
  handleRateRider: () => void;
};

const DeliveryDetailSheet = React.forwardRef<BottomSheet, Props>(
  ({onClose, deliveryStatus, handleTipRider, item, handleRateRider}, ref) => {
    const snapPoints = useMemo(() => ['65%', '80%'], []);
    const {rider, pickupRequest, deliveryId} = item || {};
    const [confirmDelivery, {isLoading}] = useConfirmDeliveryMutation();

    const callRider = () => {
      openDialer(rider.user.phone);
    };

    const handleConfirm = async () => {
      try {
        const res = await confirmDelivery(deliveryId.toString()).unwrap();
        if (res.success) {
          RenderSnackbar({text: res.message});
          onClose();
        }
      } catch (error) {
        RenderSnackbar({
          text: `Sorry ,we couldn't confirm this package, Tr yagain`,
        });
      }
    };

    const renderButtons = () => {
      if (deliveryStatus === 'active' || deliveryStatus === 'processing') {
        return <Button title="Call Rider" leftIcon={<CallIcon />} />;
      }

      if (deliveryStatus === 'completed') {
        return (
          <HStack alignItems="center" justifyContent="space-between" mt="5%" px="10px">
            <Button title="Call Rider" onPress={callRider} w="48%" leftIcon={<CallIcon />} isDisabled={isLoading} />
            <Button bg="black" isLoading={isLoading} onPress={handleConfirm} title="Received" w="48%" />
          </HStack>
        );
      }

      return (
        <HStack alignItems="center" justifyContent="space-between" mt="5%" px="10px">
          <Button
            onPress={handleTipRider}
            title="Tip Rider"
            w="48%"
            leftIcon={<RNImage source={nairaCoin} style={{width: 30, height: 30, resizeMode: 'contain'}} />}
          />
          <Button bg="black" onPress={handleRateRider} title="Rate Delivery" w="48%" />
        </HStack>
      );
    };

    const locations = pickupRequest?.deliveryLocations;
    const deliveryLocations =
      !!locations &&
      locations?.map(item => {
        return item.address;
      });

    return (
      <BottomSheetWrapperSnappy noIndicator showBackdrop index={-1} ref={ref} snapPoints={snapPoints}>
        <View px="20px" w="full">
          {/* company info */}
          <HStack h="60px" alignItems="center" justifyContent="space-between" px="10px">
            {/* TODO COMPANY LOGO */}
            <Image
              source={{uri: rider?.user?.image as string}}
              alt={`${rider?.companyName}_logo`}
              rounded="full"
              bg="gray.400"
              size="50px"
            />
            <View w="60%">
              <Text fontSize={hp(1.3)} fontWeight="600">
                {rider?.companyName}
              </Text>
              <HStack mt="10px" alignItems="center" space="2">
                {/* TODO : live timing*/}
                <TimeSolid />
                <Text fontSize="12px">3 min away</Text>
              </HStack>
            </View>
            <View justifyContent="center" alignItems="center" w="20%">
              <HStack alignItems="center" space="1">
                <PaymentMethodIcon method={pickupRequest?.paymentChannel} selected={false} />
                <Text bold textTransform="capitalize">
                  {pickupRequest?.paymentChannel}
                </Text>
              </HStack>
              <MoneyText bold moneyValue={pickupRequest?.totalAmount} />
            </View>
          </HStack>
          <DashedDivider />
          <View>
            {/* rider info */}
            <RiderInfo
              plateNo={rider?.bikeDetails.licenseNumber}
              image={rider?.user?.image as string}
              rating={rider?.rating}
              fullname={`${rider?.user.firstName} ${rider?.user.lastName}`}
            />
            {/* delivery location */}
            <RequestLocations deliveryLocations={deliveryLocations} pickUp={pickupRequest?.pickupLocation.address} />
          </View>
          <DashedDivider />
          {!!pickupRequest?.deliveryPackages &&
            pickupRequest.deliveryPackages.map((x, y) => (
              <PackageDetail
                instruction={x.deliveryInstructions}
                index={y}
                key={`PackageDetail_${y}`}
                contactName={x.recipient.name}
                contactPhone={x.recipient.phone}
                packageType={x.packageCategories}
              />
            ))}
          <DashedDivider />
          <View mt="20px" px="10px">
            {renderButtons()}
          </View>
        </View>
      </BottomSheetWrapperSnappy>
    );
  },
);

export default DeliveryDetailSheet;
