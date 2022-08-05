import LocationPinIcon from '@components/icons/location-pin';
import LocationRadiusIcon from '@components/icons/location-radius';
import {hp} from '@utils/responsive';
import {View, Text, VStack, HStack} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';

type RequestLocationsProps = {
  pickUp: string;
  deliveryLocations: Array<string>;
  bg?: ColorType;
  mt?: string;
};

/**
 * Request Location Component
 */
const RequestLocations = ({deliveryLocations, pickUp, bg, mt = '5%'}: RequestLocationsProps) => {
  return (
    <HStack bg={bg} alignItems="flex-start" space="2" justifyContent="flex-start" mt={mt} px="10px">
      <VStack justifyContent="center" alignItems="center">
        <LocationRadiusIcon />
        {deliveryLocations.map((item, key) => (
          <View key={key}>
            <View bg="accent" alignSelf="center" h="15px" w="2px" />
            <LocationPinIcon />
          </View>
        ))}
      </VStack>
      <VStack>
        <Text isTruncated fontSize={hp(1.3)}>
          {pickUp}
        </Text>
        {deliveryLocations.map((item, key) => (
          <Text fontSize={hp(1.3)} mt="10px" key={key} isTruncated>
            {item}
          </Text>
        ))}
      </VStack>
    </HStack>
  );
};

export default RequestLocations;
