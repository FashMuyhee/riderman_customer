import React from 'react';
import {ScreenWrapper, TransparentNavbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import RiderList from './components/RiderList';
import MapSection from './components/MapSection';
import {hp} from '@utils/responsive';
import {storage} from '@services/TokenManager';
import {PickupRequestInfo} from '@models/delivery';
import {STATUSBAR_HEIGHT} from '@utils/constant';

type ISelectRiderProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'select_rider'>;
};

const SelectRider: React.FC<ISelectRiderProps> = ({navigation}) => {
  const pickupInfo = storage.getString('_pickupInfo');
  const parsedPickUpInfo = JSON.parse(pickupInfo as string) as PickupRequestInfo;
  const deliveryLocation = parsedPickUpInfo.deliveryLocations[0];
  const pickupLocation = parsedPickUpInfo.pickupLocation;

  return (
    <ScreenWrapper translucentBar barStyle="dark-content">
      <TransparentNavbar />
      <MapSection
        height={hp(60) + STATUSBAR_HEIGHT}
        coordinates={[
          {latitude: parseFloat(pickupLocation.lat), longitude: parseFloat(pickupLocation.long)},
          {latitude: parseFloat(deliveryLocation.lat), longitude: parseFloat(deliveryLocation.long)},
        ]}
      />
      <RiderList />
    </ScreenWrapper>
  );
};

export default SelectRider;
