import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ScreenWrapper, PasswordTextInput, Button} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import {resetPasswordSchema} from '@utils/validator';
import {useFormik} from 'formik';
import {isEmptyString} from '@utils/helper';

export type IResetPasswordProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'r_password'>;
};

const ResetPassword: React.FC<IResetPasswordProps> = ({navigation}) => {
  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: {
      password: '',
      c_password: '',
    },
    onSubmit: values => {
      console.log('reset');
    },
    validationSchema: resetPasswordSchema,
  });

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
        <PasswordTextInput placeholder="Confirm Password" hasError={!isEmptyString(errors.c_password)} hintMessage={errors.c_password} onChange={handleChange('c_password')} mt="20px" />
        <Button title="Continue" mt="20px" />
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;
