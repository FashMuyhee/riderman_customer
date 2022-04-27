import React from 'react';
import {Text, View} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, ScreenWrapper} from '@components';
import {FormInput} from './components/FormInput';

export type IRequestDeliveryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'request_delivery'>;
};

const RequestDelivery: React.FC<IRequestDeliveryProps> = ({navigation}) => {
  return (
    <ScreenWrapper pad>
      <FormInput />
      <View
        borderStyle="dashed"
        borderRadius={'1px'}
        borderColor="#EEEEEE"
        borderWidth={0.5}
        mt="10px"
      />
      <Text fontSize="11px" color="main" mt="10px">
        + Add Another Delivery
      </Text>
      <Button title="Continue" mt="20px" />
    </ScreenWrapper>
  );
};

export {RequestDelivery};
