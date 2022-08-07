import {HStack, Text} from 'native-base';
import React from 'react';
import {formatDateWithoutYear} from '@utils/date-format';
import dayjs from 'dayjs';

const DateListTitle = ({date}: {date: string}) => {
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

export default DateListTitle;
