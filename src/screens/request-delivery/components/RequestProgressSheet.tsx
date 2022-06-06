import {View, Text, Center} from 'native-base';
import React from 'react';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import MapSection from './MapSection';
import {hp} from '@utils/responsive';
import fastTime from '@images/illustrations/fast-time.png';
import {Image} from 'react-native';
import CallIcon from '@components/icons/call';
import {Button} from '@components';
import ToggleButton from './ToggleButton';

const RequestProgressSheet = React.forwardRef<BottomSheet, {onClose: () => void}>(({onClose}, ref) => {
  return (
    <BottomSheetWrapperSnappy
      noIndicator
      // isCustomBackDrop
      dragClose={false}
      // customBackDrop={props => (
      //   <BottomSheetBackdrop {...props} disappearsOnIndex={-1} pressBehavior="none" appearsOnIndex={0} opacity={1}>
      //     <MapSection height={hp(60)} />
      //   </BottomSheetBackdrop>
      // )}
      showBackdrop
      ref={ref}
      snapPoints={['40%']}>
      <View w="full" h="full">
        <Center mt="5%">
          <Image source={fastTime} style={{marginBottom: 10}} />
          <Text bold>WAITING FOR RIDER TO CONFIRM ORDER...</Text>
          <Text w="80%" textAlign="center" mt="5px" fontSize={hp(1.3)} fontWeight="300">
            We have notified the rider about your request, please wait a bit for rider to accept request
          </Text>
          <Button w="90%" mt="7%" title="Call Rider" leftIcon={<CallIcon />} />
          <ToggleButton onToggle={console.log} />
        </Center>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default RequestProgressSheet;
