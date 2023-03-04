import {View, Pressable} from 'react-native';
import React, {useMemo} from 'react';
import {HStack, Skeleton, View as NBView, useTheme, Text} from 'native-base';
import {IDeliveryItem} from '@models/delivery';
import RequestLocations from '@screens/request-delivery/components/RequestLocations';
import dayjs from 'dayjs';

type Props = {
  onPress: (item: IDeliveryItem) => void;
  item: IDeliveryItem;
};

export const DeliverySkeleton = () => {
  return (
    <View>
      <NBView w="full" mb="20px">
        <HStack mb="10px" justifyContent="space-between">
          <Skeleton h="15px" w="1/3" rounded="sm" startColor="gray.300" endColor="gray.400" />
          <Skeleton h="15px" rounded="sm" w="1/3" startColor="gray.300" endColor="gray.400" />
        </HStack>
        <Skeleton w="full" h="50px" startColor="gray.300" endColor="gray.400" />
      </NBView>
      <NBView w="full" mb="20px">
        <HStack mb="10px" justifyContent="space-between">
          <Skeleton h="15px" w="1/3" rounded="sm" startColor="gray.300" endColor="gray.400" />
          <Skeleton h="15px" rounded="sm" w="1/3" startColor="gray.300" endColor="gray.400" />
        </HStack>
        <Skeleton w="full" h="50px" startColor="gray.300" endColor="gray.400" />
      </NBView>
    </View>
  );
};

const Item = (props: Props) => {
  const {item} = props;
  const {colors} = useTheme();

  const locations = item?.pickupRequest.deliveryLocations;
  const deliveryLocation = locations?.map(item => {
    return item.address;
  });

  // const date = useMemo(() => {
  //   if (!!item.activeAt) return item.activeAt;
  //   if (!!item.completedAt) return item.completedAt;
  //   return item.confirmedAt;
  // }, [item.deliveryStatus]);

  return (
    <Pressable
      style={{
        marginBottom: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 15,
        paddingHorizontal: 10,
        borderColor: colors.grey[500],
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        props.onPress(item);
      }}>
      <View style={{width: '80%'}}>
        <RequestLocations mt="0%" deliveryLocations={deliveryLocation} pickUp={item.pickupRequest.pickupLocation.address} />
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1}}>
        <Text>{dayjs(item.processingAt).format('hh:mm a')}</Text>
      </View>
    </Pressable>
  );
};

const DeliveryItem = React.memo(Item);

export default DeliveryItem;
