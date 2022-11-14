import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, ScrollView, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {PasswordTextInput, ScreenWrapper, TextInput, Button} from '@components';
import SliderImage from './components/SliderImage';
import {hp} from '@utils/responsive';
import {AuthContext} from '@contexts/AuthContext';
import {useFormik} from 'formik';
import {loginSchema} from '@utils/validator';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {ILoginForm} from '@models/auth';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const {authenticate} = React.useContext(AuthContext);

  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      handleLogin(values);
    },
    validationSchema: loginSchema,
  });

  const handleLogin = async (body: ILoginForm) => {
    const res = await authService.login(body);
    // TODO:USER DATA SETTING
    // authenticate(
    //   {
    //     dp: 'dd',
    //     email: values.email,
    //     fName: 'Davidson',
    //     lName: 'Ahmend',
    //     uid: '49',
    //   },
    //   'ddnfjnfgu49r32i3209',
    // );
  };

  return (
    <ScreenWrapper pad={false}>
      <ScrollView bg="main">
        <SliderImage />
        <View bg="bg" h={hp(48)} mt={hp(2)} borderTopRadius="25px" px="30px">
          <View my="30px">
            <Text fontSize="xl" textAlign="center" bold>
              Log in
            </Text>
            <Text fontSize="11px" textAlign="center" color="grey.200">
              Fill in login details to get in
            </Text>
          </View>
          <View>
            <TextInput
              hasError={!isEmptyString(errors.email)}
              hintMessage={errors.email}
              onChange={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
              placeholder="Email or Phone Number"
            />
            <PasswordTextInput
              mt="10px"
              placeholder="Password"
              value={values.password}
              onChange={handleChange('password')}
              hintMessage={errors.password}
              hasError={!isEmptyString(errors.password)}
              onSubmit={handleSubmit}
            />
            <Text fontSize="12px" alignSelf="flex-end" color="main" mt="6px" onPress={() => navigation.navigate('f_password')}>
              Forgot Password?
            </Text>
          </View>
          <Button mt="15px" title="Login" />
          <HStack mt="15px" alignSelf="center" space="2">
            <Text fontSize="12px">Don’t have an account?</Text>
            <Text fontSize="12px" color="main" onPress={() => navigation.navigate('register')}>
              Sign Up
            </Text>
          </HStack>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Login;
