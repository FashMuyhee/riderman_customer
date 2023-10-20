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
const RequestLocationsBase = ({deliveryLocations, pickUp, bg, mt = '5%'}: RequestLocationsProps) => {
  return (
    <HStack bg={bg} alignItems="center" space="2" justifyContent="flex-start" mt={mt} px="10px">
      <VStack justifyContent="center" alignItems="center">
        <LocationRadiusIcon />
        {!!deliveryLocations &&
          deliveryLocations.map((item, key) => (
            <View key={key}>
              <View bg="accent" alignSelf="center" h="15px" w="2px" />
              <LocationPinIcon />
            </View>
          ))}
      </VStack>
      <VStack justifyContent="center" alignItems="center">
        <Text mb="15px" isTruncated fontSize="12px">
          {pickUp}
        </Text>
        {!!deliveryLocations &&
          deliveryLocations.map((item, key) => (
            <Text mb={key != deliveryLocations.length - 1 ? '15px' : '0px'} fontSize="12px" key={key} isTruncated>
              {item}
            </Text>
          ))}
      </VStack>
    </HStack>
  );
};

const RequestLocations = React.memo(RequestLocationsBase);
export default RequestLocations;
