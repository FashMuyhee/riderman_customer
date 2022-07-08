import {View, Text, Center, HStack} from 'native-base';
import React from 'react';
import MapSection from './MapSection';
import {hp} from '@utils/responsive';
import fastTime from '@images/illustrations/fast-time.png';
import {Image, Modal, StatusBar, Platform, useWindowDimensions} from 'react-native';
import CallIcon from '@components/icons/call';
import {Button} from '@components';
import ToggleButton from './ToggleButton';
import {CancelRequestSheetProps} from './CancelRequestSheet';
import riderman from '@images/illustrations/riderman-sm.png';
import decline from '@images/illustrations/decline.png';
import warning from '@images/illustrations/warning.png';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GuardStackParamList} from '@navigations/param-list';

export type RequestProgressStatus = 'decline' | 'progress' | 'accepted' | 'too-long';
interface IProps extends CancelRequestSheetProps {
  progressStatus: RequestProgressStatus;
  onKeepWaiting: () => void;
}

const RequestProgressSheet = ({visible, onCancel, onClose, progressStatus, onKeepWaiting}: IProps) => {
  const handleShowCancel = () => {
    onClose();
    onCancel();
  };
  const navigation = useNavigation<NavigationProp<GuardStackParamList>>();

  const renderImage = () => {
    let image;
    switch (progressStatus) {
      case 'progress':
        image = fastTime;
        break;
      case 'accepted':
        image = riderman;
        break;
      case 'decline':
        image = decline;
        break;
      case 'too-long':
        image = warning;
        break;
    }
    return image;
  };

  const renderTitle = () => {
    let title;
    switch (progressStatus) {
      case 'progress':
        title = 'WAITING FOR RIDER TO CONFIRM ORDER...';
        break;
      case 'accepted':
        title = 'RIDER HAS ACCEPTED YOUR REQUEST! 🎉';
        break;
      case 'decline':
        title = 'RIDER DECLINED REQUEST! 😞';
        break;
      case 'too-long':
        title = 'YOU’VE BEEN WAITING FOR A WHILE NOW...';
        break;
    }
    return title;
  };

  const renderSubtitle = () => {
    let title;
    switch (progressStatus) {
      case 'progress':
        title = 'We have notified the rider about your request, please wait a bit for rider to accept request.';
        break;
      case 'accepted':
        title = 'Rider has accepted your delivery request and they’re on their way to pickup your package for delivery.';
        break;
      case 'decline':
        title = 'We are so sorry, but for some reason, Adeola Adebimpe of Rush Delivery has declined your delivery request.';
        break;
      case 'too-long':
        title = 'We have notificed that you’ve been patient for the rider to accept your request, what would you like to do next?';
        break;
    }
    return title;
  };

  const ACTION_HEIGHT = progressStatus === 'decline' ? hp(35) : hp(40);
  const MAP_HEIGHT = progressStatus === 'decline' ? hp(65) : hp(60);
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const DEVICE_HEIGHT = useWindowDimensions().height;
  const wrapperHeight = Platform.OS === 'ios' ? DEVICE_HEIGHT : DEVICE_HEIGHT + STATUSBAR_HEIGHT;

  return (
    <Modal visible={visible} statusBarTranslucent transparent>
      <View h={wrapperHeight} bg="white">
        <MapSection height={MAP_HEIGHT} />
        <View w="full" borderTopRadius="3xl" position="absolute" bg="white" bottom="1" h={ACTION_HEIGHT}>
          <Center mt="5%" px="10px">
            <Image source={renderImage()} style={{marginBottom: 10}} />
            <Text bold>{renderTitle()}</Text>
            <Text w="80%" textAlign="center" mt="5px" fontSize={hp(1.3)} fontWeight="300">
              {renderSubtitle()}
            </Text>
            {progressStatus === 'decline' && (
              <HStack w="full" mt="7%" justifyContent="space-around">
                <Button title="Cancel Request" w="47%" bg="black" onPress={handleShowCancel} />
                <Button title="Select New Rider" w="47%" onPress={() => navigation.navigate('select_rider')} />
              </HStack>
            )}
            {progressStatus === 'too-long' && (
              <HStack w="95%" mt="7%" justifyContent="space-around">
                <Button title="Select New Rider" bg="black" w="47%" onPress={() => navigation.navigate('select_rider')} />
                <Button title="Keep waiting" w="47%" onPress={onKeepWaiting} />
              </HStack>
            )}
            {(progressStatus === 'accepted' || progressStatus === 'progress') && <Button w="90%" mt="7%" title="Call Rider" leftIcon={<CallIcon />} />}
            {progressStatus != 'decline' && <ToggleButton onToggle={handleShowCancel} />}
          </Center>
        </View>
      </View>
    </Modal>
  );
};

export default RequestProgressSheet;
