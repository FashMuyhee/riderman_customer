import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, HStack, VStack} from 'native-base';
import {AuthStackParamList} from '@navigations/param-list';
import {ScreenWrapper, PasswordTextInput, Button, TextInput, PhoneInput} from '@components';
import {hp} from '@utils/responsive';
import Navbar from './components/Navbar';
import {registerSchema} from '@utils/validator';
import {useFormik} from 'formik';
import {isEmptyString} from '@utils/helper';
import authService from '@services/Auth';
import {IRegisterForm} from '@models/auth';

export type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'r_password'>;
};

const Register: React.FC<Props> = ({navigation}) => {
  const {values, handleChange, handleSubmit, errors, isValid} = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    onSubmit: values => {
      handleRegister(values);
    },
    validationSchema: registerSchema,
  });

  const handleRegister = async (body: IRegisterForm) => {
    const res = await authService.register(body);
    // TODO:success response
  };

  return (
    <ScreenWrapper pad={false} bgColor="main">
      <Navbar />
      <View bg="bg" h={hp(100)} borderTopRadius="25px" px="30px">
        <View mt="20%" mb="20%">
          <Text fontSize="3xl" textAlign="center" bold>
            Register
          </Text>
          <Text fontSize="11px" w="80%" mt="5px" alignSelf="center" textAlign="center" color="grey.200">
            Complete the sign up process to get started
          </Text>
        </View>
        <TextInput placeholder="First Name" hasError={!isEmptyString(errors.firstName)} hintMessage={errors.firstName} onChange={handleChange('firstName')} value={values.firstName} />
        <TextInput placeholder="Last Name" mt="10px" hasError={!isEmptyString(errors.lastName)} hintMessage={errors.lastName} onChange={handleChange('lastName')} value={values.lastName} />
        <TextInput
          placeholder="Email"
          mt="10px"
          keyboardType="email-address"
          hasError={!isEmptyString(errors.email)}
          hintMessage={errors.email}
          onChange={handleChange('email')}
          value={values.email}
        />
        <PhoneInput hasError={!isEmptyString(errors.phone)} hintMessage={errors.phone} onChange={handleChange('phone')} value={values.phone} />
        <PasswordTextInput placeholder="Password" mt="10px" hasError={!isEmptyString(errors.password)} hintMessage={errors.password} onChange={handleChange('password')} value={values.password} />

        <Button title="Register" mt="20px" onPress={handleSubmit} />
        <HStack mt="30px" alignSelf="center" space="2">
          <Text fontSize="12px">Don’t have an account?</Text>
          <Text fontSize="12px" color="main" underline onPress={() => navigation.navigate('login')}>
            Login
          </Text>
        </HStack>
        <VStack mt="16">
          <Text fontSize="12px" textAlign="center">
            By creating an account with Riderman and using our
          </Text>
          <HStack flexWrap="wrap" space="1" justifyContent="center">
            <Text fontSize="12px" textAlign="center">
              services, you agree to
            </Text>
            <Text fontSize="12px" textAlign="center" color="main" underline>
              Terms & Conditions
            </Text>
            <Text fontSize="12px">and</Text>
            <Text fontSize="12px" color="main" underline>
              Privacy
            </Text>
            <Text fontSize="12px" color="main" underline>
              Policy
            </Text>
          </HStack>
        </VStack>
      </View>
    </ScreenWrapper>
  );
};

export default Register;
