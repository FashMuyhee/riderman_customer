import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, ScrollView, HStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {PasswordTextInput, ScreenWrapper, TextInput, Button, RenderSnackbar} from '@components';
import SliderImage from './components/SliderImage';
import {hp} from '@utils/responsive';
import {AuthContext} from '@contexts/AuthContext';
import {useFormik} from 'formik';
import {loginSchema} from '@utils/validator';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {ILoginForm, IUser} from '@models/auth';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const {authenticate} = React.useContext(AuthContext);
  // dannyff@fallinhay.com
  const {values, handleChange, handleSubmit, errors, isValid, isSubmitting, setSubmitting} = useFormik({
    initialValues: {
      email: 'njoy@enjoy.com',
      password: 'qwertyuiop',
    },
    onSubmit: values => {
      handleLogin(values);
    },
    validationSchema: loginSchema,
  });

  const handleLogin = async (body: ILoginForm) => {
    try {
      const res = await authService.login(body);
      if (res?.statusCode === 200) {
        authenticate(res.data as IUser, res.token as string);
      } else if (res?.statusCode === 400) {
        RenderSnackbar({text: 'Incorrect Email or Password', duration: 'LONG'});
      } else {
        RenderSnackbar({text: 'Something went wrong,Please Try Again', duration: 'LONG'});
      }
      setSubmitting(false);
    } catch (error) {
      RenderSnackbar({text: 'Something went wrong,Please Try Again', duration: 'LONG'});
      setSubmitting(false);
    }
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <Text fontSize="12px" alignSelf="flex-end" color="main" mt="6px" onPress={() => navigation.navigate('f_password')}>
              Forgot Password?
            </Text>
          </View>
          <Button isDisabled={!isValid} mt="15px" title="Login" isLoading={isSubmitting} onPress={handleSubmit} />
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
