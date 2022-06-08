import {View, Text, Divider} from 'native-base';
import React from 'react';
import {hp} from '@utils/responsive';
import attention from '@images/illustrations/attention.png';
import {Image, Modal} from 'react-native';
import {Button} from '@components';

type IProps = {
  onClose: () => void;
  onCancel: () => void;
  visible: boolean;
};
const CancelRequestSheet = ({onClose, visible, onCancel}: IProps) => {
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View w="full" h="full" bg="rgba(38, 50, 56, 0.69)" alignItems="center" justifyContent="flex-end">
        <View alignItems="center" mt="5%" bg="white" h="28%" w="85%" rounded="xl" mb="5%">
          <Image source={attention} style={{marginTop: '10%', marginBottom: 20}} />
          <Text w="80%" textAlign="center" mt="5px" fontSize={hp(1.4)} fontWeight="300">
            Do you really want to cancel this request? This process cannot be undone.{' '}
          </Text>
          <Divider mt="5%" />
          <Text color="red.600" onPress={onCancel} mt="5%" fontSize={hp(1.4)}>
            Cancel Pickup
          </Text>
        </View>
        <Button title="Close" onPress={onClose} color="main" bg="white" w="85%" mb="15%" />
      </View>
    </Modal>
  );
};

export default CancelRequestSheet;
