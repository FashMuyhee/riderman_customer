import {View, Text, Image} from 'native-base';
import React from 'react';
import avatar from '@images/avatar.png';

type Props = {
  image: string;
  deliveryCount: number;
};

const RidermanAvatar = (props: Props) => {
  return (
    <View w="50px" h="50px">
      <Image
        alt="rider image"
        source={!!props.image ? {uri: props.image} : avatar}
        style={{width: 50, height: 50, alignSelf: 'center', borderRadius: 40, backgroundColor: '#eeeee'}}
      />
      <View
        bg="linear-gradient(180deg, rgba(23, 143, 79, 0.7) 0%, rgba(16, 97, 54, 0.7) 100%)"
        w="50px"
        position="absolute"
        bottom="0px"
        borderRadius="sm">
        <Text fontSize="12px" opacity="1" textAlign="center" color="white">
          {props.deliveryCount}
        </Text>
      </View>
    </View>
  );
};

export default RidermanAvatar;
