import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, ScrollView, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ScreenWrapper} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import PinInput from './components/PinInput';

export type IVerifyCodeProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'verify'>;
};

const VerifyCode: React.FC<IVerifyCodeProps> = ({navigation}) => {
  const [token, setToken] = useState('');

  return (
    <ScreenWrapper pad={false} bgColor="main">
      <Navbar />
      <View bg="bg" h={hp(100)} borderTopRadius="25px" px="30px">
        <View my="30px">
          <Text fontSize="xl" textAlign="center" bold>
            Enter Code
          </Text>
          <Text
            fontSize="11px"
            w="65%"
            alignSelf="center"
            textAlign="center"
            color="grey.200">
            A six digit code was sent to your email and phone number
          </Text>
          <Text fontSize="11px" mt="10px" bold textAlign="center">
            Resend code in 6:00 min
          </Text>
        </View>
        <PinInput
          value={token}
          onChange={setToken}
          onFinish={() => navigation.navigate('r_password')}
        />
        <HStack
          w="60%"
          alignItems="center"
          space="2"
          mt="15px"
          alignSelf={'center'}>
          <Text fontSize="11px">Didn’t receive code? </Text>
          <Text
            fontSize="11px"
            onPress={() => navigation.navigate('r_password')}
            underline
            color="main">
            Resend code
          </Text>
        </HStack>
      </View>
    </ScreenWrapper>
  );
};

export default VerifyCode;
