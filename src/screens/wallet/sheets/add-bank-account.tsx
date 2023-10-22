import React, {useEffect, useState} from 'react';
import {HStack, Text, View, CheckCircleIcon, Spinner} from 'native-base';
import { Button, SelectInput, TextInput, RenderSnackbar, SheetNavigationHeader} from '@components';
import {useAddBankAccountMutation} from '@services/rtk-queries/banks';
import {useFormik} from 'formik';
import {addBankAccountSchema} from '@utils/validator';
import {AddBankAccountForm, CommercialBanksData} from '@models/bank';
import {isEmptyString} from '@utils/helper';
import httpHandler from '@utils/http';
import {useMMKVString} from 'react-native-mmkv';
import Snackbar from 'react-native-snackbar';
import ActionSheet, {ActionSheetRef, SheetProps} from 'react-native-actions-sheet';
import { ACTION_SHEET_ANIMATION, ACTION_SHEET_STYLES } from '@utils/constant';

export const AddBankAccountSheet = ({sheetId}: SheetProps) => {
  const ref = React.useRef<ActionSheetRef>(null);
  const [addBank] = useAddBankAccountMutation();
  const [commercialBanksStrng, setCommercialBanks] = useMMKVString('commercialBanks');
  const commercialBanks = commercialBanksStrng == undefined ? [] : (JSON.parse(commercialBanksStrng) as CommercialBanksData[]);

  const [fetchingBanks, setFetchingBanks] = useState(true);
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [accountName, setAccountName] = useState('');

  const fetchCommercialBanks = async () => {
    try {
      setFetchingBanks(true);
      const res = await httpHandler({method: 'get', url: '/banks/list'});
      if (res?.data) {
        setCommercialBanks(JSON.stringify(res?.data?.data));
        setFetchingBanks(false);
      }
    } catch (error) {
      setCommercialBanks('[]');
      setFetchingBanks(false);
    }
  };

  const validateAccount = async (account: string) => {
    try {
      setValidated(false);
      setValidating(true);
      setAccountName('');
      const res = await httpHandler({
        method: 'post',
        url: '/bank-accounts/resolve',
        data: {accountNumber: account, bankCode: values.bankCode},
      });
      setValidating(false);
      if (res?.data) {
        if (res?.data?.success) {
          const resolved = res?.data?.data?.accountName;
          setFieldValue('accountName', resolved);
          setValidated(true);
        }
      }
    } catch (error) {
      RenderSnackbar({
        text: `We couldn't verify this account, please verify that the account number and bank are correct`,
        duration: 'INFINITE',
        action: {text: 'Close', onPress: () => Snackbar.dismiss()},
      });
      setValidating(false);
      setValidated(false);
    }
  };

  const {values, handleSubmit, errors, isSubmitting, setSubmitting, setFieldValue, resetForm} = useFormik({
    initialValues: {
      accountNumber: '',
      bankCode: '',
      bankName: '',
      currency: 'NGN',
      bankImage: '',
      accountName: '',
    },
    onSubmit: values => {
      handleAddAccount(values);
    },
    validationSchema: addBankAccountSchema,
  });

  const onChangeAccountNo = async (acctNo: string) => {
    if (acctNo.length < 11) {
      setFieldValue('accountNumber', acctNo);
    }
    if (acctNo.length == 10) {
      await validateAccount(acctNo);
    }
  };

  const onChangeBank = (bankCode: string) => {
    const bank = commercialBanks?.find(x => x.code == bankCode);
    setFieldValue('bankCode', bank?.code);
    setFieldValue('bankName', bank?.name);
    setFieldValue('bankImage', bank?.image);
    if (values.accountNumber.length == 10) {
      validateAccount(values.accountNumber);
    }
  };

  const handleAddAccount = async (value: AddBankAccountForm) => {
    try {
      setSubmitting(true);
      const res = await addBank(value).unwrap();
      if (res.success) {
        setSubmitting(false);
        RenderSnackbar({text: res.message});
        ref.current?.hide();
        resetForm();
      }
    } catch (error) {
      setSubmitting(false);
      RenderSnackbar({
        text: 'We could not add your bank account, Please Try Again',
      });
    }
  };

  useEffect(() => {
    fetchCommercialBanks();
  }, []);

  return (
    <ActionSheet
      id={sheetId}
      ref={ref}
      keyboardHandlerEnabled
      containerStyle={ACTION_SHEET_STYLES}
      openAnimationConfig={ACTION_SHEET_ANIMATION}
      snapPoints={[60]}>
      <View h="full">
        <SheetNavigationHeader onClose={()=>        ref.current?.hide()} title="Add New Bank Account" />
      <View mt="7%" px="20px">
        <SelectInput
          label="Select Bank"
          placeholder="Select your bank"
          options={commercialBanks}
          transform
          withSearch
          searchPlaceholder="Search Banks"
          displayKey="name"
          valueKey="code"
          value={values.bankCode}
          onChange={onChangeBank}
          inputHint={errors.bankCode}
          isLoading={commercialBanks.length > 0 ? false : fetchingBanks}
        />
        <TextInput
          placeholder="Enter Account Number"
          keyboardType="number-pad"
          value={values.accountNumber}
          hasError={!isEmptyString(errors.accountNumber)}
          hintMessage={errors.accountNumber}
          onChange={onChangeAccountNo}
          disabled={validating}
        />
        {validating && (
          <HStack mb="20px" alignItems="center" space="3">
            <Spinner color="main" size="sm" />
            <Text bold fontSize="sm" textAlign="center" color="darkBlue.600">
              Verifying Account Details
            </Text>
          </HStack>
        )}
        {values?.accountName.length > 0 && (
          <HStack mb="20px" alignItems="center" space="3">
            <CheckCircleIcon size={5} color="green.500" />
            <Text bold fontSize="lg" textAlign="center" color="darkBlue.600" textTransform="uppercase">
              {values?.accountName}
            </Text>
          </HStack>
        )}
        <Button
          title="Save Bank Account"
          isDisabled={!isEmptyString(errors.accountNumber) || !isEmptyString(errors.bankCode) || validating || !validated}
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
      </View>
    </ActionSheet>
  );
};
