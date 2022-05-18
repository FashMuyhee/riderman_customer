import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ScreenWrapper, TransparentNavbar} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import SelectRiderModal from './components/SelectRiderSheet';
import BottomSheet from '@gorhom/bottom-sheet';

type ISelectRiderProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'select_rider'>;
};

const SelectRider: React.FC<ISelectRiderProps> = ({navigation}) => {
  const selectRiderRef = useRef<BottomSheet>(null);


  return (
    <ScreenWrapper bgColor="teal.500">
      <TransparentNavbar />
      <SelectRiderModal ref={selectRiderRef} />
    </ScreenWrapper>
  );
};

export default SelectRider;
