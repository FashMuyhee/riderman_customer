import React, {useCallback} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hp} from '@utils/responsive';
import BottomSheet, {BottomSheetBackdrop, BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {ColorType} from 'native-base/lib/typescript/components/types';

export type IBottomSheetWrapperProps = {
  isBackDrop?: boolean;
  height?: number;
  children: React.ReactNode;
  noIndicator?: boolean;
};

const BottomSheetWrapper = React.forwardRef<RBSheet, IBottomSheetWrapperProps>(({children, isBackDrop = true, height = hp(45), noIndicator = false}, ref) => {
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
          width: noIndicator ? 0 : 60,
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
  noIndicator?: boolean;
  isCustomBackDrop?: boolean;
  customBackDrop?: React.FC<BottomSheetBackdropProps>;
  showBackdrop?: boolean;
  bgColor?: ColorType;
};

const BottomSheetWrapperSnappy = React.forwardRef<BottomSheet, IBottomSheetWrapperSnappyProps>(
  ({children, customBackDrop, isCustomBackDrop, snapPoints = ['25%', '50%'], index = -1, dragClose = true, noIndicator, showBackdrop, bgColor = 'white'}, ref) => {
    const renderBackdrop = useCallback(props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.2} />, []);

    return (
      <BottomSheet
        backdropComponent={showBackdrop ? renderBackdrop : undefined}
        keyboardBlurBehavior="restore"
        keyboardBehavior="fillParent"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={dragClose}
        handleIndicatorStyle={{backgroundColor: '#f5f5f5', width: noIndicator ? 0 : 60}}
        // @ts-ignore
        backgroundStyle={{backgroundColor: bgColor}}
        index={index}
        ref={ref}
        animationConfigs={{damping: 20, stiffness: 150}}
        snapPoints={snapPoints}>
        {children}
      </BottomSheet>
    );
  },
);

export {BottomSheetWrapper, BottomSheetWrapperSnappy};
