import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {View, Text} from 'native-base';
import {hp} from '@utils/responsive';

export type IBottomSheetWrapperProps = {
  isBackDrop?: boolean;
  height?: number;
  children: React.ReactNode;
};

const BottomSheetWrapper = React.forwardRef<RBSheet, IBottomSheetWrapperProps>(
  ({children, isBackDrop = true, height = hp(45)}, ref) => {
    return (
      <RBSheet
        closeOnPressBack
        keyboardAvoidingViewEnabled
        ref={ref}
        height={height}
        closeOnDragDown
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: isBackDrop
              ? 'rgba(18, 18, 18, 0.3)'
              : 'rgba(18, 18, 18, 0.04)',
          },
          draggableIcon: {
            backgroundColor: '#f5f5f5',
            width: 60,
          },
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        }}>
        {children}
      </RBSheet>
    );
  },
);

export default BottomSheetWrapper;
