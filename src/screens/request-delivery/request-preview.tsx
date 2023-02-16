import {MoneyText, ScreenWrapper, Button, RenderSnackbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, Center, ScrollView, Box, HStack, useDisclose} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import riderman from '@images/illustrations/riderman.png';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import riderImage from '@images/rider.png';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from './components/SelectPaymentMethod';
import RiderInfo from './components/RiderInfo';
import RequestLocations from './components/RequestLocations';
import {PackageNote, PackageType} from './components/SummaryItem';
import UserIcon from '@components/icons/user';
import PhoneIcon from '@components/icons/phone';
import CallIcon from '@components/icons/call';
import RequestProgressSheet from './components/RequestProgressSheet';
import CancelRequestSheet from './components/CancelRequestSheet';
import {storage} from '@services/TokenManager';
import {PickupRequestInfo, PickupRequestProgressStatus} from '@models/delivery';
import deliveryService from '@services/Delivery';
import openDialer from '@utils/open-dialer';
import pusherEventService from '@services/Pusher';
import {PusherEvent} from '@pusher/pusher-websocket-react-native';

interface RequestPreview {
  navigation: StackNavigationProp<GuardStackParamList, 'request_preview'>;
}

type PackageInfoProps = {
  contactName: string;
  contactPhone: string;
  packageType: string[];
  instruction: string;
  index: number;
};
export const PackageDetail = ({contactName, contactPhone, packageType, index, instruction}: PackageInfoProps) => {
  return (
    <View px="15px" mt="4%">
      <HStack alignItems="center" space="2">
        <Text fontSize="12px" bold>
          D{index}
        </Text>
        {packageType?.map((item, key) => (
          <PackageType type={item} key={key} />
        ))}
      </HStack>
      <HStack mt="3%" alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" w="48%" space="4">
          <UserIcon />
          <Text fontSize="12px">{contactName}</Text>
        </HStack>
        <HStack alignItems="center" w="48%" space="5">
          <PhoneIcon />
          <Text fontSize="12px">{contactPhone}</Text>
        </HStack>
      </HStack>
      <PackageNote rounded note={instruction} />
    </View>
  );
};

const RequestPreview = ({navigation}: RequestPreview) => {
  const {isOpen: visibleProgress, onToggle: toggleProgress} = useDisclose();
  const {isOpen: visibleCancel, onToggle: toggleCancel} = useDisclose();
  const [progressStatus, setProgressStatus] = useState<PickupRequestProgressStatus>('pending');
  const pickupInfo = storage.getString('_pickupInfo');
  const {rider, delivery_packages, paymentChannel, totalAmount, delivery_locations, pickupLocation, pickupRequestId} = JSON.parse(
    pickupInfo as string,
  ) as PickupRequestInfo;
  const [duration, setDuration] = useState('');
  const pusher = pusherEventService.pusher;

  const deliveryLocations = useMemo(() => {
    return delivery_locations.map(location => {
      return location.address;
    });
  }, []);

  const handleOnCloseCancelModal = () => {
    toggleCancel();
    toggleProgress();
  };

  const getTimeAway = async () => {
    const {duration} = await deliveryService.calcDistanceMatrix({x: rider.location, y: pickupLocation});
    setDuration(duration.text);
    setTimeout(() => {
      toggleProgress();
    }, 10000);
  };

  const handleCancelPickup = async () => {
    try {
      const res = await deliveryService.cancelPickupRequest(pickupRequestId.toString());
      if (res?.success) {
        toggleCancel();
        handleSelectNewRider();
      }
    } catch (error) {
      RenderSnackbar({text: `We couldn't process your request, Please try again`});
    }
  };

  const handleSelectNewRider = () => {
    RenderSnackbar({text: 'Select another rider'});
    navigation.navigate('select_rider');
  };

  // PUSHER EVENT
  const onEventChange = async () => {
    const channel = await pusher.subscribe({
      channelName: `pickupRequests.${pickupRequestId}`,
      onEvent: ({eventName, data}: PusherEvent) => {
        // rejected
        if (eventName === 'PickupRequestRejected') {
          setProgressStatus('rejected');
          // navigation.goBack();
          RenderSnackbar({text: `Rider rejected request`, duration: 'LONG'});
        }
        // arrived
        if (eventName === 'RiderArrived') {
          RenderSnackbar({text: `Rider has arrived`, duration: 'LONG'});
          // @ts-ignore
          navigation.replace('payment_screen', JSON.parse(pickupInfo as string));
        }
        // accepted
        if (eventName === 'PickupRequestAccepted') {
          setProgressStatus('accepted');
        }
      },
    });
  };

  useEffect(() => {
    getTimeAway();
    onEventChange();

    return () => {
      pusher.unsubscribe({channelName: `pickupRequests.${pickupRequestId}`});
    };
  }, []);

  return (
    <ScreenWrapper barColor="white" barStyle="dark-content">
      <ScrollView>
        <Center marginTop={hp(10)}>
          <Image source={riderman} alt="riderman" />
          <Text w="60%" fontSize={hp(1.5)} mt="5%" textAlign="center">
            Request has been sent to rider successfully!
          </Text>
        </Center>
        <Box mt="4%" minH={hp(65)}>
          {/* company info */}
          <HStack borderTopRadius="2xl" bg="accent" h="80px" alignItems="center" justifyContent="space-between" px="10px">
            {/* TODO: add compnay logo */}
            <Image source={logo} alt="company logo" rounded="full" bg="gray.400" size="50px" />
            <View w="60%">
              <Text fontSize={hp(1.3)} fontWeight="600">
                {rider?.company?.name}
              </Text>
              <HStack mt="10px" alignItems="center" space="2">
                <TimeSolid />
                <Text fontSize="12px">{duration} away</Text>
              </HStack>
            </View>
            <View justifyContent="center" alignItems="center" w="20%">
              <HStack alignItems="center" space="1">
                <PaymentMethodIcon method={paymentChannel} selected={false} />
                <Text>{paymentChannel}</Text>
              </HStack>
              <MoneyText bold moneyValue={totalAmount} />
            </View>
          </HStack>
          {/* rider info */}
          {/* TODO: rider image */}
          <RiderInfo
            image={riderImage}
            fullname={`${rider?.user?.firstName} ${rider?.user?.lastName}`}
            plateNo={rider?.bikeDetails.licenseNumber}
            rating={rider?.rating}
          />
          <RequestLocations pickUp={pickupLocation.address} {...{deliveryLocations}} />
          <View borderWidth={1} mx="10px" mt="20px" borderColor="gray.200" borderStyle="dashed" />
          {delivery_packages?.map((item, key) => (
            <PackageDetail
              key={key}
              contactName={item.recipient.name}
              contactPhone={item.recipient.phone}
              packageType={item.packageCategories}
              index={key + 1}
              instruction={item.deliveryInstructions}
            />
          ))}
          <View borderWidth={1} mx="10px" mt="10px" borderColor="gray.200" borderStyle="dashed" />
        </Box>
        <HStack alignItems="center" position="absolute" bottom="0" justifyContent="space-between" mt="5%" px="10px">
          <Button
            title="Call Rider"
            w="full"
            leftIcon={<CallIcon />}
            onPress={() => {
              openDialer(rider?.user.phone);
            }}
          />
        </HStack>
      </ScrollView>
      {/* TODo pusher event for waiting and rec */}
      <RequestProgressSheet
        onKeepWaiting={() => setProgressStatus('pending')}
        progressStatus={progressStatus}
        visible={visibleProgress}
        onClose={toggleProgress}
        onCancel={toggleCancel}
        deliveryLocations={delivery_locations}
        onSelectNewRider={handleSelectNewRider}
        onCallRider={() => openDialer(rider?.user.phone)}
        {...{pickupLocation}}
      />
      <CancelRequestSheet visible={visibleCancel} onCancel={handleCancelPickup} onClose={handleOnCloseCancelModal} />
    </ScreenWrapper>
  );
};

export default RequestPreview;
