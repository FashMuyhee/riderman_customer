import {Pressable, Text, HStack, VStack, Avatar} from 'native-base';
import React, {memo} from 'react';
import {TransactionItem as TransactionData} from '@models/wallet';
import MoneyText, {amountToNaira} from '@components/MoneyText';
import dayjs from 'dayjs';
import {PaymentMethodIcon} from '@screens/request-delivery/components/SelectPaymentMethod';

interface Props {
  item: TransactionData;
}

const Item: React.FunctionComponent<Props> = ({item}) => {
  const isCredit = item.type == 'credit';
  const transactionType = isCredit ? 'C' : 'D';

  return (
    <Pressable borderBottomWidth={1} borderColor="coolGray.200">
      <HStack
        alignItems={'center'}
        justifyContent="flex-start"
        py="10px"
        space="2"
        w="full">
        <Avatar
          bg={isCredit ? 'info.300' : 'amber.700'}
          w="30px"
          h="30px"
          _text={{textTransform: 'uppercase', color: 'white'}}>
          {transactionType}
        </Avatar>
        <VStack
          w="65%"
          space="1"
          alignItems="flex-start"
          justifyContent="center">
          <Text mb="-5px" fontSize="15px" bold>
            {item.meta.note}
          </Text>
          <Text fontSize={'12px'} isTruncated numberOfLines={2} w="80%">
            To: {item.meta.recipient}
          </Text>
          <Text
            color="gray.500"
            isTruncated
            fontSize="12px"
            fontWeight="semibold">
            {dayjs(item.createdAt).format('DD MMM,YYYY h:mm A')}
          </Text>
        </VStack>
        <VStack w="20%" alignItems="flex-end" justifyContent="center">
          <MoneyText
            moneyValue={amountToNaira(item.amount)}
            color="light.600"
            bold
            fontSize={'15px'}
            isTruncated
          />
          <HStack alignItems="center" space="2">
            <Text textTransform="capitalize">{item.paymentChannel}</Text>
            <PaymentMethodIcon method={item.paymentChannel} selected={false} />
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

const TransactionItem = memo(Item);

export default TransactionItem;
