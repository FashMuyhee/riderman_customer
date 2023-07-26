import React, {useContext, useEffect, useRef} from 'react';
import {
  Button,
  PhoneInput,
  RenderSnackbar,
  ScreenWrapper,
  TextInput,
} from '@components';
import {ScrollView} from 'native-base';
import {useFormik} from 'formik';
import {phoneNumberFormat, profileUpdateSchema} from '@utils/validator';
import {AuthContext} from '@contexts/AuthContext';
import PhoneTextInput from 'react-native-phone-input';
import {IUpdateForm, IUser} from '@models/auth';
import authService from '@services/Auth';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import ProfileImage from './components/ProfileImage';

const Profile = () => {
  const {user, updateUser} = useContext(AuthContext);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
      email: user?.email as string,
      phone: user?.phone as string,
    },
    onSubmit: values => {
      handleSave(values);
    },
    validationSchema: profileUpdateSchema,
  });

  const phoneRef = useRef<PhoneTextInput>(null);

  const handleSave = async (values: IUpdateForm) => {
    try {
      const res = await authService.updateProfile({
        ...values,
        phone: phoneNumberFormat(values.phone),
      });
      if (res?.statusCode === 200) {
        RenderSnackbar({text: res.message, duration: 'LONG'});
        updateUser(res.data as IUser);
      } else if (res?.statusCode === 400) {
        RenderSnackbar({text: 'Invalid Input', duration: 'LONG'});
      } else {
        RenderSnackbar({
          text: 'Something went wrong,Please Try Again',
          duration: 'LONG',
        });
      }
      setSubmitting(false);
    } catch (error) {
      RenderSnackbar({
        text: 'Something went wrong,Please Try Again',
        duration: 'LONG',
      });
      setSubmitting(false);
    }
  };
  useEffect(() => {
    phoneRef.current?.setValue(user?.phone as string);
  }, []);

  return (
    <ScreenWrapper translucentBar={false} bgColor="bg" barStyle="light-content">
      <ScrollView px="20px">
        <ProfileImage />
        <TextInput
          label="First Name"
          mt="10px"
          value={values.firstName}
          onChange={handleChange('firstName')}
          hintMessage={errors.firstName}
          hasError={!!errors?.firstName}
        />
        <TextInput
          label="Last Name"
          value={values.lastName}
          onChange={handleChange('lastName')}
          hintMessage={errors.lastName}
          hasError={!!errors?.lastName}
        />
        <TextInput
          keyboardType="email-address"
          label="Email Address (Uneditable)"
          value={values.email}
          disabled
          onChange={handleChange('email')}
        />
        <PhoneInput
          ref={phoneRef}
          label="Phone Number"
          value={values.phone}
          onChange={handleChange('phone')}
          hintMessage={errors.phone}
          hasError={!!errors?.phone}
        />
        <Button
          isDisabled={!isValid}
          mt="15px"
          title="Update"
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;
