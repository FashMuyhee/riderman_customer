import {View, Text, Center, HStack} from 'native-base';
import React from 'react';
import {hp} from '@utils/responsive';
import bikeMan from '@images/illustrations/riderman.png';
import {Image, Modal, Platform, useWindowDimensions} from 'react-native';
import {Button} from '@components';
import {STATUSBAR_HEIGHT} from '@utils/constant';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onGoToDelivery: () => void;
}

const PaymentConfirmationSheet = ({
  visible,
  onClose,
  onGoHome,
  onGoToDelivery,
}: IProps) => {
  const DEVICE_HEIGHT = useWindowDimensions().height;
  const wrapperHeight =
    Platform.OS === 'ios' ? DEVICE_HEIGHT : DEVICE_HEIGHT + STATUSBAR_HEIGHT;

  const handleGoHome = () => {
    onClose();
    onGoHome();
  };

  const handleGoToDelivery = () => {
    onClose();
    onGoToDelivery();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      transparent>
      <View h={wrapperHeight} bg="#00000060">
        <View
          w="full"
          borderTopRadius="3xl"
          position="absolute"
          bg="white"
          bottom="0"
          h={hp(35)}>
          <Center mt="10%" px="10px">
            <Image
              source={bikeMan}
              style={{
                marginBottom: 10,
                height: 70,
                width: 130,
                resizeMode: 'contain',
              }}
            />
            <Text bold mb="10px" fontSize="lg">
              Delivery Now in Progress
            </Text>
            <HStack w="95%" mt="7%" justifyContent="space-around">
              <Button
                title="Go Home"
                bg="black"
                w="47%"
                onPress={handleGoHome}
              />
              <Button
                title="View Deliveries"
                w="47%"
                onPress={handleGoToDelivery}
              />
            </HStack>
          </Center>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentConfirmationSheet;
