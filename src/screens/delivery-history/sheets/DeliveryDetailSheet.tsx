import React from 'react';
import {HStack, Spinner, Text, View, Image} from 'native-base';
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
import {useConfirmDeliveryMutation, useGetSingleDeliveryQuery} from '@services/rtk-queries/deliveries';
import {RouteScreenProps} from 'react-native-actions-sheet';
import {NavigationHeader} from './components';

export const DeliveryDetailSheet = ({params, router}: RouteScreenProps) => {
  const {data, isLoading: isFetchingDelivery} = useGetSingleDeliveryQuery(params.deliveryId);
  const deliveryStatus = params.deliveryStatus as DeliveryStatus;
  const item = data?.data as IDeliveryItem;
  const {rider, pickupRequest, deliveryId} = item || {};
  const [confirmDelivery, {isLoading}] = useConfirmDeliveryMutation();

  const callRider = () => {
    openDialer(rider.user.phone);
  };

  const onClose = () => {
    router.goBack();
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
          onPress={() => router.navigate('tip-rider', rider.riderId)}
          title="Tip Rider"
          w="48%"
          leftIcon={<RNImage source={nairaCoin} style={{width: 30, height: 30, resizeMode: 'contain'}} />}
        />
        <Button bg="black" onPress={() => router.navigate('rate-delivery')} title="Rate Delivery" w="48%" />
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
    <View h="full" px="10px" w="full">
      <NavigationHeader onClose={() => router.close()} title="Delivery History" />
      {isFetchingDelivery ? (
        <View alignItems="center" justifyContent="center" h="full" w="full">
          <Spinner color="red" />
        </View>
      ) : (
        <>
          {/* company info */}
          <HStack h="60px" alignItems="center" justifyContent="space-between" px="10px">
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
        </>
      )}
    </View>
  );
};
