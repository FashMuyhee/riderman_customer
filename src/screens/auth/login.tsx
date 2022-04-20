import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';

export type ILoginProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'login'>;
};

const Login: React.FC<ILoginProps> = ({navigation}) => {
  return (
    <View>
      <Text>Adewest</Text>
    </View>
  );
};

export default Login;
