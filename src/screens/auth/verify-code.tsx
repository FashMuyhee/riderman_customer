import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, ScrollView, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ScreenWrapper} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import PinInput from './components/PinInput';
import authService from '@services/Auth';
import {storage} from '@services/TokenManager';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'verify'>;
};

const VerifyCode: React.FC<Props> = ({navigation}) => {
  const [token, setToken] = useState('');

  const handleSubmit = async (body: string) => {
    const phone = storage.getString('_FP_PHONE') as string;
    const res = await authService.verifyToken({phone, token: body});
    storage.set('_FP_TOKEN', body);

    // TODO:success
  };

  const handleResendToken = async () => {
    const phone = storage.getString('_FP_PHONE') as string;
    const res = await authService.sendForgotPasswordToken({phone});
    // TODO:success
  };

  return (
    <ScreenWrapper pad={false} bgColor="main">
      <Navbar />
      <View bg="bg" h={hp(100)} borderTopRadius="25px" px="30px">
        <View my="30px">
          <Text fontSize="xl" textAlign="center" bold>
            Enter Code
          </Text>
          <Text fontSize="11px" w="65%" alignSelf="center" textAlign="center" color="grey.200">
            A six digit code was sent to your email and phone number
          </Text>
          <Text fontSize="11px" mt="10px" bold textAlign="center">
            Resend code in 6:00 min
          </Text>
        </View>
        <PinInput value={token} onChange={setToken} onFinish={handleSubmit} />
        <HStack w="60%" alignItems="center" space="2" mt="15px" alignSelf={'center'}>
          <Text fontSize="11px">Didn’t receive code? </Text>
          <Text fontSize="11px" onPress={handleResendToken} underline color="main">
            Resend code
          </Text>
        </HStack>
      </View>
    </ScreenWrapper>
  );
};

export default VerifyCode;
