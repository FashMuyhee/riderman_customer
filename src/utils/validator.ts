import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  phone: yup.string().required(),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .max(25)
    .min(8, ({min}) => `Password must be at least ${min} characters`),
  c_password: yup
    .string()
    .max(25)
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  phone: yup.string().required('Phone Number Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const addBankAccountSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('Required')
    .length(10, ({length}) => `Account Number must be  ${length} characters`),
  bankCode: yup.string().required('Required'),
  bankName: yup.string().required('Required'),
  currency: yup.string().required('Required'),
  bankImage: yup.string().required('Required'),
});
export const withdrawFundSchema = yup.object().shape({
  bankId: yup.number().required('Required'),
  amount: yup.string().required('Required'),
});

export const profileUpdateSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  phone: yup.string().required('Phone Number Required'),
});

export const phoneNumberFormat = (phone: string) => {
  return phone.split(' ').join('').replace('+', '');
};
