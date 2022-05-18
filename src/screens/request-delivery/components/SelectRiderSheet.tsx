import React, {useMemo} from 'react';
import {Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {TextInput} from '@components';

export interface SelectRiderProps {}

const SelectRiderModal = React.forwardRef<BottomSheet, SelectRiderProps>(({}, ref) => {
  const snapPoints = useMemo(() => ['40%', '50%'], []);

  return (
    <BottomSheetWrapperSnappy dragClose={false} index={0} ref={ref} snapPoints={snapPoints}>
      <View mb="10px" px="20px">
        <Text textAlign="center" bold>
          Select a Package
        </Text>
        <TextInput />
        <TextInput />
        <TextInput />
        <TextInput />
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default SelectRiderModal;
