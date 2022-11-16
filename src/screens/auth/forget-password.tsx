import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ActivityModal, PhoneInput, RenderSnackbar, ScreenWrapper} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import {forgotPasswordSchema, phoneNumberFormat} from '@utils/validator';
import {useFormik} from 'formik';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {storage} from '@services/TokenManager';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'f_password'>;
};

const ForgetPassword: React.FC<Props> = ({navigation}) => {
  const {values, handleChange, handleSubmit, errors, isSubmitting, setSubmitting} = useFormik({
    initialValues: {
      phone: '',
    },
    onSubmit: values => {
      handleSendToken(values);
    },
    validationSchema: forgotPasswordSchema,
  });

  const handleSendToken = async (body: {phone: string}) => {
    try {
      const res = await authService.sendForgotPasswordToken({phone: phoneNumberFormat(body.phone)});
      setSubmitting(false);
      if (res?.statusCode === 200) {
        storage.set('_FP_PHONE', phoneNumberFormat(body.phone));
        navigation.replace('verify_forgot');
        return;
      } else if (res?.statusCode === 400) {
        setTimeout(() => {
          RenderSnackbar({text: 'Verify that you enter a registered Phone number', duration: 'LONG'});
        }, 300);
      }
    } catch (error) {
      setTimeout(() => {
        RenderSnackbar({text: 'Verify that you enter a registered Phone number', duration: 'LONG'});
      }, 300);
      // console.log('🚀 ~ file: forget-password.tsx ~ line 35 ~ handleSendToken ~ error', error);
      setSubmitting(false);
      // TODO:success and error
    }
  };

  return (
    <ScreenWrapper pad={false} bgColor="main">
      <Navbar />
      <View bg="bg" h={hp(100)} borderTopRadius="25px" px="30px">
        <View my="30px">
          <Text fontSize="xl" textAlign="center" bold>
            Forgot Password
          </Text>
          <Text fontSize="11px" w="65%" alignSelf="center" textAlign="center" color="grey.200">
            Enter your phone number to receive a reset code
          </Text>
        </View>
        {/* @ts-ignore */}
        <PhoneInput hasError={!isEmptyString(errors.phone)} hintMessage={errors.phone} value={values.phone} onChange={handleChange('phone')} onSubmit={handleSubmit} />
        <HStack w="60%" alignItems="center" space="2" mt="15px" alignSelf={'center'}>
          <Text fontSize="11px">Remember password? </Text>
          <Text fontSize="11px" onPress={() => navigation.navigate('login')} underline color="main">
            Login
          </Text>
        </HStack>
      </View>
      <ActivityModal isLoading={isSubmitting} />
    </ScreenWrapper>
  );
};

export default ForgetPassword;
