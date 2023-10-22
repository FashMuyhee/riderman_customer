import React from 'react';
import {Text, View} from 'native-base';
import {Button, TextInput, RenderSnackbar, SheetNavigationHeader} from '@components';
import {useGetBankAccountsQuery} from '@services/rtk-queries/banks';
import {useFormik} from 'formik';
import {withdrawFundSchema} from '@utils/validator';
import {isEmptyString} from '@utils/helper';
import NairaMoneyIcon from '@components/icons/naira-money';
import {useGetWalletBalanceQuery, useWithdrawToBankMutation} from '@services/rtk-queries/wallet';
import {Alert} from 'react-native';
import {moneyFormat} from '@components/MoneyText';
import Snackbar from 'react-native-snackbar';
import BankItem from '../components/BankItem';
import {WithdrawToBankForm} from '@models/wallet';
import ActionSheet, {ActionSheetRef, SheetManager, SheetProps} from 'react-native-actions-sheet';
import {ACTION_SHEET_ANIMATION, ACTION_SHEET_STYLES} from '@utils/constant';

export const WithdrawSheet = ({sheetId}: SheetProps) => {
  const ref = React.useRef<ActionSheetRef>(null);
  const {data: banks, isLoading: fetchingBanks} = useGetBankAccountsQuery();
  const [withdraw] = useWithdrawToBankMutation();
  const {data} = useGetWalletBalanceQuery();
  const balance = data?.data;

  const isInsufficient = parseInt(balance?.accountBalance as string) / 100 < 5000;

  const {values, handleSubmit, errors, isSubmitting, setSubmitting, setFieldValue, handleChange, resetForm} = useFormik({
    initialValues: {
      amount: '',
      bankId: 1,
    },
    onSubmit: values => {
      handleWithdraw(values);
    },
    validationSchema: withdrawFundSchema,
  });

  const handleWithdraw = async (value: WithdrawToBankForm) => {
    try {
      setSubmitting(true);
      const res = await withdraw({
        amount: values.amount,
        bankId: values.bankId,
      }).unwrap();
      setSubmitting(false);
      if (res.success) {
        Alert.alert(
          'Withdraw Success',
          `${moneyFormat(values.amount)} has been successfully transfer to your bank account, it might take few minutes before reflecting`,
        );
        onClose();
        resetForm();
      } else {
        RenderSnackbar({
          text: `Sorry we couldn't transfer to your bank, Please Try Again`,
        });
      }
    } catch (error) {
      setSubmitting(false);
      RenderSnackbar({
        text: `Sorry we couldn't transfer to your bank, Please Try Again`,
      });
    }
  };

  const handleOpenAccountSheet = () => {
    if ((banks?.length as number) > 2) {
      RenderSnackbar({
        text: 'You can only add two bank accounts',
        duration: 'INFINITE',
        action: {text: 'Close', onPress: () => Snackbar.dismiss()},
      });
    } else {
      // onClose();
      SheetManager.show('add-bank-account');
    }
  };

  const onClose = () => {
    ref.current?.hide();
  };

  return (
    <ActionSheet
      id={sheetId}
      ref={ref}
      keyboardHandlerEnabled
      containerStyle={ACTION_SHEET_STYLES}
      openAnimationConfig={ACTION_SHEET_ANIMATION}
      snapPoints={[60, 70]}>
      <View h="full" w="full">
        <SheetNavigationHeader onClose={onClose} title="Withdraw Wallet Balance" />
        <View mt="7%" px="20px">
          <Button title="Add New Bank Account" onPress={handleOpenAccountSheet} w="full" bg="black" color="white" mb="20px" />
          {isInsufficient && (
            <Text bold fontSize="lg" mb="10px" textAlign="center" color="darkBlue.600" textTransform="uppercase">
              insufficient balance
            </Text>
          )}

          <TextInput
            leftIcon={<NairaMoneyIcon />}
            leftIconDivider
            placeholder="Enter Account Number"
            keyboardType="number-pad"
            value={values.amount}
            hasError={!isEmptyString(errors.amount)}
            hintMessage={errors.amount}
            onChange={handleChange('amount')}
            disabled={isInsufficient}
          />

          {(banks?.length as number) > 0 ? (
            banks?.map((bank, z) => (
              <BankItem
                key={`bank_${z}`}
                {...bank}
                onDelete={id => console.log(id)}
                onPress={id => setFieldValue('bankId', id)}
                selected={values.bankId == bank.bankAccountId}
              />
            ))
          ) : (
            <Text bold textAlign="center" fontSize="lg" my="20px">
              No Saved Banks
            </Text>
          )}

          <Button title="Proceed to Withdraw" isLoading={isSubmitting} onPress={handleSubmit} isDisabled={isInsufficient} />
        </View>
      </View>
    </ActionSheet>
  );
};
