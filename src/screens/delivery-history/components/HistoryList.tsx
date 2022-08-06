import {Text, HStack, Pressable} from 'native-base';
import React from 'react';
import {ScreenWrapper} from '@components';
import RequestLocations from '../../request-delivery/components/RequestLocations';
import dayjs from 'dayjs';
import {formatDateWithoutYear} from '@utils/date-format';
import DeliveryDetailSheet from './DeliveryDetailSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {DeliveryStatus} from '@models/delivery';

type Props = {
  status: DeliveryStatus;
};

const DateTimeTitle = ({date}: {date: string}) => {
  const renderDay = () => {
    const now = dayjs();
    const dayCount = dayjs(date).diff(now, 'days');

    if (dayCount === 0) {
      return 'today';
    }

    if (dayCount === -1) {
      return 'yesterday';
    }

    return dayjs(date).format('dddd');
  };
  return (
    <HStack alignItems="center" my="10px" justifyContent="space-between">
      <Text textTransform="uppercase" bold fontSize="14px">
        {renderDay()}
      </Text>
      <Text textTransform="uppercase" fontSize="13px">
        {formatDateWithoutYear(date)}
      </Text>
    </HStack>
  );
};

const HistoryList = ({status}: Props) => {
  const deliveryDetailSheet = React.useRef<BottomSheet>(null);

  return (
    <ScreenWrapper pad>
      <DateTimeTitle date="2022-08-01" />
      <Pressable onPress={() => deliveryDetailSheet.current?.snapToIndex(0)} bg="white" borderWidth={1} borderColor="grey.500" py="15px" rounded="lg" px="10px">
        <RequestLocations mt="0%" deliveryLocations={['26, Obafemi Awolowo Road', 'Bayeku Igbogbo, Ikorodu, Lagos']} pickUp="Mushilab Nigeria Limited, Abeokuta" />
      </Pressable>

      <DeliveryDetailSheet deliveryStatus={status} ref={deliveryDetailSheet} onClose={() => deliveryDetailSheet.current?.close()} />
    </ScreenWrapper>
  );
};

export default HistoryList;
