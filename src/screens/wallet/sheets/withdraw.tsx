import React, {useMemo} from 'react';
import {HStack, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import {DashedDivider, Button, TextInput, RenderSnackbar} from '@components';
import {useGetBankAccountsQuery} from '@services/rtk-queries/banks';
import {useFormik} from 'formik';
import {withdrawFundSchema} from '@utils/validator';
import {isEmptyString} from '@utils/helper';
import NairaMoneyIcon from '@components/icons/naira-money';
import {useWithdrawToBankMutation} from '@services/rtk-queries/wallet';
import {Alert} from 'react-native';
import {moneyFormat} from '@components/MoneyText';
import Snackbar from 'react-native-snackbar';
import BankItem from '../components/BankItem';
import {WithdrawToBankForm} from '@models/wallet';

const WithdrawSheet = React.forwardRef<
  BottomSheet,
  {addNewAccount: () => void; onClose: () => void}
>(({onClose, addNewAccount}, ref) => {
  const snapPoints = useMemo(() => ['60%', '70%'], []);
  const {data: banks, isLoading: fetchingBanks} = useGetBankAccountsQuery();
  const [withdraw] = useWithdrawToBankMutation();

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
          `${moneyFormat(
            values.amount,
          )} has been successfully transfer to your bank account, it might take few minutes before reflecting`,
        );
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
      onClose();
      addNewAccount();
    }
  };

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
          onPress={handleOpenAccountSheet}
          w="full"
          bg="black"
          color="white"
          mb="20px"
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
