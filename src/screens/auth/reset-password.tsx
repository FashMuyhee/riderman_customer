import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ScreenWrapper, PasswordTextInput, Button, RenderSnackbar} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import {resetPasswordSchema} from '@utils/validator';
import {useFormik} from 'formik';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {IRsetPasswordForm} from '@models/auth';
import {storage} from '@services/TokenManager';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'r_password'>;
};

const ResetPassword: React.FC<Props> = ({navigation}) => {
  const token = storage.getString('_FP_TOKEN') as string;
  const phone = storage.getString('_FP_PHONE') as string;
  console.log("🚀 ~ file: reset-password.tsx ~ line 22 ~ phone", phone)

  const {values, handleChange, handleSubmit, errors, isValid, isSubmitting, setSubmitting} = useFormik({
    initialValues: {
      password: '',
      c_password: '',
    },
    onSubmit: values => {
      handleReset(values.password);
    },
    validationSchema: resetPasswordSchema,
  });

  const handleReset = async (password: string) => {
    const body: IRsetPasswordForm = {newPassword: password, token, phone};
    const res = await authService.resetPassword(body);
    console.log("🚀 ~ file: reset-password.tsx ~ line 37 ~ handleReset ~ res", res)
    try {
      if (res?.statusCode == 200) {
        storage.delete('_FP_TOKEN');
        storage.delete('_FP_PHONE');
        navigation.replace('login');
        setTimeout(() => {
          RenderSnackbar({text: 'Password Reset Successful', duration: 'LONG'});
        }, 500);
      } else {
        setTimeout(() => {
          RenderSnackbar({text: `Couldn't Reset Password , Try Again`, duration: 'LONG'});
        }, 500);
      }
      setSubmitting(false);
    } catch (error) {
      setTimeout(() => {
        RenderSnackbar({text: 'Try Again, Something went wrong', duration: 'LONG'});
      }, 300);
      setSubmitting(false);
    }
  };

  return (
    <ScreenWrapper pad={false} bgColor="main">
      <Navbar />
      <View bg="bg" h={hp(100)} borderTopRadius="25px" px="30px">
        <View my="30px">
          <Text fontSize="xl" textAlign="center" bold>
            Create New Password
          </Text>
          <Text fontSize="11px" w="65%" alignSelf="center" textAlign="center" color="grey.200">
            New Password must be more than 8 digits long
          </Text>
        </View>
        <PasswordTextInput value={values.password} placeholder="New Password" hasError={!isEmptyString(errors.password)} hintMessage={errors.password} onChange={handleChange('password')} />
        <PasswordTextInput value={values.c_password} placeholder="Confirm Password" hasError={!isEmptyString(errors.c_password)} hintMessage={errors.c_password} onChange={handleChange('c_password')} mt="20px" onSubmit={handleSubmit} />
        <Button title="Continue" mt="20px" isDisabled={!isValid} isLoading={isSubmitting} onPress={handleSubmit} />
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;
