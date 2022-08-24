import {DateListTitle, ScreenWrapper} from '@components';
import {View, Text, HStack, Circle} from 'native-base';
import React from 'react';

type Props = {};

type NotificationProps = {
  company: string;
  rider: string;
  message: string;
  timeDate: string;
};

const NotificationItem = ({company, rider, message, timeDate}: NotificationProps) => {
  return (
    <HStack
      bg="white"
      minH="80px"
      mb="10px"
      rounded="md"
      borderWidth={1}
      borderTopColor="grey.500"
      borderBottomColor="grey.500"
      borderRightColor="grey.500"
      borderLeftWidth={10}
      px="20px"
      py="10px"
      borderLeftColor="lightAccent">
      <View w="3/4">
        <Text>{`${rider} from ${company} ${message}`}</Text>
      </View>
      <View alignItems="flex-end" w="100px" justifyContent="space-between">
        <Circle bg="red.700" size={3} />
        <Text color="muted.400">5:30PM</Text>
      </View>
    </HStack>
  );
};
const Notifications = (props: Props) => {
  return (
    <ScreenWrapper pad>
      <DateListTitle date="2022-05-19" />
      <NotificationItem rider="Shola Onibalusi" company="King Solomon Deliveries" message="has completed delivery" timeDate="" />
    </ScreenWrapper>
  );
};
export default Notifications;
