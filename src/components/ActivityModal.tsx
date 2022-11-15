import {View, Spinner} from 'native-base';
import React from 'react';
import {Modal} from 'react-native';

type Props = {
  isLoading: boolean;
};

const ActivityModal = (props: Props) => {
  return (
    <Modal visible={props.isLoading} transparent statusBarTranslucent>
      <View h="full" w="full" alignItems="center" bg="rgba(0,0,0,.4)" justifyContent="center">
        <Spinner color="main" size="lg" />
      </View>
    </Modal>
  );
};

export default ActivityModal;
