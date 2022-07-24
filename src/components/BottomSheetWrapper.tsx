import React, {useCallback} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {hp, wp} from '@utils/responsive';
import BottomSheet, {BottomSheetBackdrop, BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {Modal} from 'react-native';
import {View} from 'native-base';

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
};

const BottomSheetWrapperSnappy = React.forwardRef<BottomSheet, IBottomSheetWrapperSnappyProps>(
  ({children, customBackDrop, isCustomBackDrop, snapPoints = ['25%', '50%'], index = -1, dragClose = true, noIndicator, showBackdrop}, ref) => {
    const renderBackdrop = useCallback(props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.2} />, []);

    // const CustomBackDrop = () => {
    //   return (
    //     <Modal visible transparent>
    //       <View w={wp(100)} h={hp(100)}>
    //         {customBackDrop}
    //       </View>
    //     </Modal>
    //   );
    // };
    return (
      <BottomSheet
        backdropComponent={showBackdrop ? renderBackdrop : undefined}
        keyboardBlurBehavior="restore"
        keyboardBehavior="fillParent"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={dragClose}
        handleIndicatorStyle={{backgroundColor: '#f5f5f5', width: noIndicator ? 0 : 60}}
        backgroundStyle={{backgroundColor: '#fff'}}
        index={index}
        ref={ref}
        animationConfigs={{damping: 20, stiffness: 90,}}
        snapPoints={snapPoints}>
        {children}
      </BottomSheet>
    );
  },
);

export {BottomSheetWrapper, BottomSheetWrapperSnappy};
