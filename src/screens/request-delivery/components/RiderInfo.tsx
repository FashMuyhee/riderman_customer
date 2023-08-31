import {RidermanAvatar, Rating} from '@components';
import {hp} from '@utils/responsive';
import {View, Text, HStack} from 'native-base';
import React from 'react';

type IProps = {
  image: string;
  plateNo: string;
  fullname: string;
  rating: string;
};

const RiderInfo = (props: IProps) => {
  return (
    <HStack px="10px" mt="3%" alignItems="center" justifyContent="space-between">
      <RidermanAvatar image={props.image} deliveryCount={300} />
      <View w="50%">
        <Text fontWeight="semibold" fontSize={hp(1.4)}>
          {props.fullname}
        </Text>
        <Rating number={props.rating} />
      </View>
      <View w="30%">
        <Text fontSize="12px" textAlign="right">
          Plate No.
        </Text>
        <Text bold fontSize="12px" textAlign="right">
          {props.plateNo}
        </Text>
      </View>
    </HStack>
  );
};

export default RiderInfo;
