import React, {useMemo, useState} from 'react';
import {HStack, Text, View} from 'native-base';
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
import {useGetBankAccountsQuery} from '@services/rtk-queries/banks';
import {useFormik} from 'formik';
import {addBankAccountSchema} from '@utils/validator';
import {AddBankAccountForm} from '@models/bank';
import {isEmptyString} from '@utils/helper';
import NairaMoneyIcon from '@components/icons/naira-money';

const WithdrawSheet = React.forwardRef<
  BottomSheet,
  {addNewAccount: () => void; onClose: () => void}
>(({onClose, addNewAccount}, ref) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const {data: banks, isLoading: fetchingBanks} = useGetBankAccountsQuery();

  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [accountName, setAccountName] = useState('');

  const {
    values,
    handleSubmit,
    errors,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    handleChange,
  } = useFormik({
    initialValues: {
      amount: '',
      bankCode: '',
      bankName: '',
      currency: 'NGN',
      bankImage: '',
    },
    onSubmit: values => {
      handleWithdraw(values);
    },
    validationSchema: addBankAccountSchema,
  });

  const onChangeBank = (bankCode: string) => {};

  const handleWithdraw = async (value: AddBankAccountForm) => {};

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
              Withdraw Wallet Balance
            </Text>
          </View>
          <View w="1/4" />
        </HStack>
        <DashedDivider mt="5px" />
      </View>
      <View mt="7%" px="20px">
        <Button
          title="Add New Bank Account"
          onPress={() => {
            onClose();
            addNewAccount();
          }}
          w="full"
          bg="black"
          color="white"
          mb="20px"
        />
        <SelectInput
          label="Select Bank"
          placeholder="Select your bank"
          options={banks}
          transform
          displayKey="accountName"
          valueKey="bankAccountId"
          multiDisplayKey
          displayKeySecondary="maskedAccountNumber"
          value={values.bankCode}
          onChange={onChangeBank}
          inputHint={errors.bankCode}
          isLoading={(banks?.length as number) > 0 ? false : fetchingBanks}
        />
        <TextInput
          leftIcon={<NairaMoneyIcon />}
          leftIconDivider
          placeholder="Enter Account Number"
          keyboardType="number-pad"
          value={values.amount}
          hasError={!isEmptyString(errors.amount)}
          hintMessage={errors.amount}
          onChange={handleChange('amount')}
        />

        <Button
          title="Proceed to Withdraw"
          isLoading={isSubmitting}
          onPress={handleSubmit}
        />
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default WithdrawSheet;
