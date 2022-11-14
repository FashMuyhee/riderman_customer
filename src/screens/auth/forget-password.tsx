import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {PhoneInput, ScreenWrapper} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import {forgotPasswordSchema} from '@utils/validator';
import {useFormik} from 'formik';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {storage} from '@services/TokenManager';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'f_password'>;
};

const ForgetPassword: React.FC<Props> = ({navigation}) => {
  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: {
      phone: '',
    },
    onSubmit: values => {
      handleSendToken(values);
    },
    validationSchema: forgotPasswordSchema,
  });

  const handleSendToken = async (body: {phone: string}) => {
    const res = await authService.sendForgotPasswordToken(body);
    storage.set('_FP_PHONE', body.phone);
    // TODO:success and error
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
    </ScreenWrapper>
  );
};

export default ForgetPassword;
