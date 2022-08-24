import React, {useMemo} from 'react';
import {HStack, Text, View, Image} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import companyLogo from '@images/company-logo.png';
import nairaCoin from '@images/icons/naira-coin.png';
import {Button, DashedDivider, MoneyText} from '@components';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from '@screens/request-delivery/components/SelectPaymentMethod';
import RiderInfo from '@screens/request-delivery/components/RiderInfo';
import RequestLocations from '@screens/request-delivery/components/RequestLocations';
import {PackageDetail} from '@screens/request-delivery/request-preview';
import CallIcon from '@components/icons/call';
import {DeliveryStatus} from '@models/delivery';
import {Image as RNImage} from 'react-native';

const DeliveryDetailSheet = React.forwardRef<BottomSheet, {onClose: () => void; deliveryStatus: DeliveryStatus; handleTipRider: () => void}>(({onClose, deliveryStatus, handleTipRider}, ref) => {
  const snapPoints = useMemo(() => ['65%', '80%'], []);

  const renderButtons = () => {
    if (deliveryStatus === 'Active' || deliveryStatus === 'Processing') {
      return <Button title="Call Rider" leftIcon={<CallIcon />} />;
    }

    if (deliveryStatus === 'Completed') {
      return (
        <HStack alignItems="center" justifyContent="space-between" mt="5%" px="10px">
          <Button bg="black" title="Go To Home" w="48%" />
          <Button title="Call Rider" w="48%" leftIcon={<CallIcon />} />
        </HStack>
      );
    }

    return <Button onPress={handleTipRider} title="Tip Rider" leftIcon={<RNImage source={nairaCoin} style={{width: 30, height: 30, resizeMode: 'contain'}} />} />;
  };
  return (
    <BottomSheetWrapperSnappy noIndicator showBackdrop index={-1} ref={ref} snapPoints={snapPoints}>
      <View px="20px" w="full">
        {/* company info */}
        <HStack h="60px" alignItems="center" justifyContent="space-between" px="10px">
          <Image source={companyLogo} alt="company logo" rounded="full" bg="gray.400" size="50px" />
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
              <PaymentMethodIcon method="Card" selected={false} />
              <Text bold>Card</Text>
            </HStack>
            <MoneyText bold moneyValue={4000} />
          </View>
        </HStack>
        <DashedDivider />
        <View>
          {/* rider info */}
          <RiderInfo fullname="James Kingston" rating={4} plateNo="GTY67809" image={companyLogo} />
          {/* delivery location */}
          <RequestLocations deliveryLocations={['Bayeku Igbogbo, Ikorodu, Lagos', 'Bayeku Igbogbo, Ikorodu, Lagos']} pickUp="26, Obafemi Awolowo Road" />
        </View>
        <DashedDivider />
        <PackageDetail index={1} contactName="Ngozi Emma" contactPhone="090483728323" packageType={['Bags', 'Shoes']} />
        <DashedDivider />
        <View mt="20px" px="10px">
          {renderButtons()}
        </View>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default DeliveryDetailSheet;
