import {FlatList, ScreenWrapper} from '@components';
import {Notification} from '@models/notification';
import {useGetNotificationsQuery} from '@services/rtk-queries/notification';
import dayjs from 'dayjs';
import {View, Text, HStack, Circle, VStack} from 'native-base';
import React, {useState} from 'react';

type Props = {};

type NotificationProps = {
  message: string;
  title: string;
  timeDate: Date;
  read: boolean;
};

const NotificationItem = ({title, message, timeDate, read}: NotificationProps) => {
  return (
    <VStack
      bg="white"
      minH="80px"
      mb="10px"
      rounded="md"
      borderWidth={1}
      borderTopColor="grey.500"
      borderBottomColor="grey.500"
      borderRightColor="grey.500"
      borderLeftWidth={10}
      px="10px"
      py="10px"
      borderLeftColor="lightAccent">
      <View>
        <Text bold fontSize="sm">
          {title}
        </Text>
        <Text fontSize="xs">{message}</Text>
      </View>
      <HStack mt="10px" space="2">
        <Text fontSize="xs" color="muted.400">
          {dayjs(timeDate).format('ddd Do MMM YY')}
        </Text>
        <Text fontSize="xs" color="muted.400">
          {dayjs(timeDate).format('hh:MM A')}
        </Text>
      </HStack>
      {read && <Circle bg="red.500" borderRadius="20px" size="10px" position="absolute" right={2} top={2} />}
    </VStack>
  );
};
const Notifications = (props: Props) => {
  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetNotificationsQuery(page);

  return (
    <ScreenWrapper pad>
      <FlatList
        data={data}
        onEndReached={() => {
          setPage(prev => +1);
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: Notification}) => (
          <NotificationItem read message={item.body} title={item.title} timeDate={item.createdAt} />
        )}
        keyExtractor={d => d.notificationId.toString()}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        onEndReachedThreshold={0.3}
      />
    </ScreenWrapper>
  );
};
export default Notifications;
