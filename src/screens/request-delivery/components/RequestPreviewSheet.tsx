import {View, Text} from 'native-base';
import React from 'react';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet,{BottomSheetScrollView} from '@gorhom/bottom-sheet';

const RequestPreviewSheet = React.forwardRef<BottomSheet, {onClose: () => void}>(({onClose}, ref) => {
  return (
    <BottomSheetWrapperSnappy index={-1} ref={ref} snapPoints={['100%']}>
      <BottomSheetScrollView style={{paddingHorizontal:20,paddingTop:20}}>

      </BottomSheetScrollView>
    </BottomSheetWrapperSnappy>
  );
});

export default RequestPreviewSheet;
