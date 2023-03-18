import React, {useEffect, useMemo, useState} from 'react';
import {HStack, Text, View, CheckCircleIcon, Spinner} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import {
  DashedDivider,
  Button,
  SelectInput,
  TextInput,
  RenderSnackbar,
} from '@components';
import {useAddBankAccountMutation} from '@services/rtk-queries/banks';
import {useFormik} from 'formik';
import {addBankAccountSchema} from '@utils/validator';
import {AddBankAccountForm, CommercialBanksData} from '@models/bank';
import {isEmptyString} from '@utils/helper';
import httpHandler from '@utils/http';
import {useMMKVString} from 'react-native-mmkv';
import Snackbar from 'react-native-snackbar';

const AddAccountSheet = React.forwardRef<BottomSheet, {onClose: () => void}>(
  ({onClose}, ref) => {
    const snapPoints = useMemo(() => ['70%'], []);
    const [addBank] = useAddBankAccountMutation();
    const [commercialBanksStrng, setCommercialBanks] =
      useMMKVString('commercialBanks');
    const commercialBanks =
      commercialBanksStrng == undefined
        ? []
        : (JSON.parse(commercialBanksStrng) as CommercialBanksData[]);

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
            setAccountName(resolved);
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

    const {
      values,
      handleSubmit,
      errors,
      isSubmitting,
      setSubmitting,
      setFieldValue,
    } = useFormik({
      initialValues: {
        accountNumber: '',
        bankCode: '',
        bankName: '',
        currency: 'NGN',
        bankImage: '',
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
      <BottomSheetWrapperSnappy
        bgColor="#fafafa"
        noIndicator
        showBackdrop
        index={-1}
        ref={ref}
        snapPoints={snapPoints}>
        <View>
          <HStack
            w="full"
            alignItems="center"
            justifyContent="space-between"
            h="40px"
            px="20px">
            <View w="1/4">
              <Text onPress={onClose} color="main" textAlign="left">
                Cancel
              </Text>
            </View>
            <View w="2/4">
              <Text fontSize={hp(1.5)} textAlign="center" fontWeight="semibold">
                Add New Bank Account
              </Text>
            </View>
            <View w="1/4" />
          </HStack>
          <DashedDivider mt="5px" />
        </View>
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
          {accountName.length > 0 && (
            <HStack mb="20px" alignItems="center" space="3">
              <CheckCircleIcon size={5} color="green.500" />
              <Text
                bold
                fontSize="lg"
                textAlign="center"
                color="darkBlue.600"
                textTransform="uppercase">
                {accountName}
              </Text>
            </HStack>
          )}
          <Button
            title="Save Bank Account"
            isDisabled={
              !isEmptyString(errors.accountNumber) ||
              !isEmptyString(errors.bankCode) ||
              validating ||
              !validated
            }
            isLoading={isSubmitting}
            onPress={handleSubmit}
          />
        </View>
      </BottomSheetWrapperSnappy>
    );
  },
);

export default AddAccountSheet;
