import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hp} from '@utils/responsive';
import BottomSheet from '@gorhom/bottom-sheet';

export type IBottomSheetWrapperProps = {
  isBackDrop?: boolean;
  height?: number;
  children: React.ReactNode;
};

const BottomSheetWrapper = React.forwardRef<RBSheet, IBottomSheetWrapperProps>(({children, isBackDrop = true, height = hp(45)}, ref) => {
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
          backgroundColor: isBackDrop ? 'rgba(18, 18, 18, 0.3)' : 'rgba(18, 18, 18, 0.04)',
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
});

export type IBottomSheetWrapperSnappyProps = {
  dragClose?: boolean;
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
};

const BottomSheetWrapperSnappy = React.forwardRef<BottomSheet, IBottomSheetWrapperSnappyProps>(
  ({children, snapPoints = ['25%', '50%'], index = -1, dragClose = true}, ref) => {
    return (
      <BottomSheet
        keyboardBlurBehavior="restore"
        keyboardBehavior="fillParent"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={dragClose}
        handleIndicatorStyle={{backgroundColor: '#f5f5f5', width: 60}}
        backgroundStyle={{backgroundColor: '#fff'}}
        index={index}
        ref={ref}
        snapPoints={snapPoints}>
        {children}
      </BottomSheet>
    );
  },
);

export {BottomSheetWrapper, BottomSheetWrapperSnappy};
