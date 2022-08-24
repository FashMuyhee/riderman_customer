import React, {useRef} from 'react';
import {ScreenWrapper, TransparentNavbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import SelectRiderModal from './components/SelectRiderSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CompanyInfoSheet from './components/CompanyInfoSheet';
import MapSection from './components/MapSection';

type ISelectRiderProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'select_rider'>;
};

const SelectRider: React.FC<ISelectRiderProps> = ({navigation}) => {
  const selectRiderRef = useRef<BottomSheet>(null);
  const companyRef = useRef<BottomSheet>(null);

  const handleOPencCompanySheet = (id: string) => {
    console.log(id);
    selectRiderRef.current?.close();
    companyRef.current?.snapToIndex(0);
  };

  return (
    <ScreenWrapper barStyle='dark-content'>
      <TransparentNavbar />
      <MapSection />
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
