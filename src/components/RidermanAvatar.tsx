import {View, Text, Image} from 'native-base';
import React from 'react';
import {ImageSourcePropType} from 'react-native';

type Props = {
  image: ImageSourcePropType | undefined;
  deliveryCount: number;
};

const RidermanAvatar = (props: Props) => {
  return (
    <View w="50px" h="50px">
      <Image source={props.image} style={{width: 50, height: 50, alignSelf: 'center', borderRadius: 40}} />
      <View bg="linear-gradient(180deg, rgba(23, 143, 79, 0.7) 0%, rgba(16, 97, 54, 0.7) 100%)" w="50px" position="absolute" bottom="0px" borderRadius="sm">
        <Text fontSize="12px" opacity="1" textAlign="center" color="white">
          {props.deliveryCount}
        </Text>
      </View>
    </View>
  );
};

export default RidermanAvatar;
