import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  phone: yup.string().required()
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required').max(25)
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  c_password: yup
    .string().max(25)
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is Required'),
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  phone: yup.string().required('Phone Number Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const getStartedSchema = yup.object().shape({
  address: yup.string().required('Required'),
  country: yup.string().required('Required'),
  state: yup.string().required('Required'),
  city: yup.string().required('Required'),
  licenseImage: yup.string().required('Required'),
  licenseNo: yup.string().required('Required'),
  licenseExpDate: yup.string().required('Required'),
  profilePhoto: yup.string().required('Required'),
  guarantorFName: yup.string().required('Required'),
  guarantorLName: yup.string().required('Required'),
  guarantorRelationship: yup.string().required('Required'),
  guarantorEmail: yup.string().email('Please enter valid email').required('Required'),
  guarantorPhone: yup.string().required('Required'),
  guarantorAddress: yup.string().required('Required'),
  bankAcctNo: yup.string()
    .test('len', 'Account Number must be 10 Digit', val => val?.length === 10).required('Required').matches(/^[0-9]+$/, "Numbers Only"),
  bankName: yup.string().required('Required'),
});
