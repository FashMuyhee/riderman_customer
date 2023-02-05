import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ActivityModal, RenderSnackbar, ScreenWrapper} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import PinInput from './components/PinInput';
import authService from '@services/Auth';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'verify'>;
};

const VerifyCode: React.FC<Props> = ({navigation}) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (body: string) => {
    setIsLoading(true);
    try {
      const res = await authService.verifyAccount(body);
      if (res?.success) {
        RenderSnackbar({text: 'Verification Successful'});
        navigation.replace('login');
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      RenderSnackbar({text: `Couldn't Complete Verification , Try Again`});
    } catch (error) {
      console.log("🚀 ~ file: verify-code.tsx:32 ~ handleSubmit ~ error", error)
      setIsLoading(false);
      RenderSnackbar({text: `Couldn't Complete Verification , Try Again`});
    }
    // TODO:success
  };

  const handleResendToken = async () => {
    try {
      setIsLoading(true);
      const res = await authService.resendAccountVerify();
      if (res?.success) {
        setTimeout(() => {
          RenderSnackbar({text: 'Verification code sent to your email of phone number'});
        }, 300);
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        RenderSnackbar({text: `Couldn't Verification Code, Try Again`});
      }, 300);
      setIsLoading(false);
    } catch (error) {
      setTimeout(() => {
        RenderSnackbar({text: `Couldn't Verification Code, Try Again`});
      }, 300);
      setIsLoading(false);
    }
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
      <ActivityModal isLoading={isLoading} />
    </ScreenWrapper>
  );
};

export default VerifyCode;
