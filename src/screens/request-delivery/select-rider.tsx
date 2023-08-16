import React, {useRef} from 'react';
import {ScreenWrapper, TransparentNavbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import SelectRiderModal from './components/SelectRiderSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CompanyInfoSheet from './components/CompanyInfoSheet';
import MapSection from './components/MapSection';
import {hp} from '@utils/responsive';
import {storage} from '@services/TokenManager';
import {PickupRequestInfo} from '@models/delivery';

type ISelectRiderProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'select_rider'>;
};

const SelectRider: React.FC<ISelectRiderProps> = ({navigation}) => {
  const selectRiderRef = useRef<BottomSheet>(null);
  const companyRef = useRef<BottomSheet>(null);
  const pickupInfo = storage.getString('_pickupInfo');
  const parsedPickUpInfo = JSON.parse(pickupInfo as string) as PickupRequestInfo;
  const deliveryLocation = parsedPickUpInfo.deliveryLocations[0];
  const pickupLocation = parsedPickUpInfo.pickupLocation;

  const handleOPencCompanySheet = (id: string) => {
    console.log(id);
    selectRiderRef.current?.close();
    companyRef.current?.snapToIndex(0);
  };

  return (
    <ScreenWrapper barStyle="dark-content">
      <TransparentNavbar />
      <MapSection
        height={hp(43)}
        coordinates={[
          {latitude: parseFloat(pickupLocation.lat), longitude: parseFloat(pickupLocation.long)},
          {latitude: parseFloat(deliveryLocation.lat), longitude: parseFloat(deliveryLocation.long)},
        ]}
      />
      <SelectRiderModal ref={selectRiderRef} handleCompanyInfo={handleOPencCompanySheet} />
      <CompanyInfoSheet
        ref={companyRef}
        onClose={() => {
          companyRef.current?.close();
          selectRiderRef.current?.snapToIndex(0);
        }}
      />
    </ScreenWrapper>
  );
};

export default SelectRider;
