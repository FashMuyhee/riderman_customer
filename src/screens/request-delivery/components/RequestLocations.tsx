import LocationPinIcon from '@components/icons/location-pin';
import LocationRadiusIcon from '@components/icons/location-radius';
import {hp} from '@utils/responsive';
import {View, Text, VStack, HStack} from 'native-base';
import React from 'react';

type RequestLocationsProps = {
  pickUp: string;
  deliveryLocations: Array<string>;
};

const RequestLocations = ({deliveryLocations, pickUp}: RequestLocationsProps) => {
  return (
    <HStack alignItems="flex-start" space="2" justifyContent="flex-start" mt="5%" px="10px">
      <VStack justifyContent="center" alignItems="center">
        <LocationRadiusIcon />
        {deliveryLocations.map((item, key) => (
          <React.Fragment key={item}>
            <View borderColor="accent" borderWidth={2} h="15px" />
            <LocationPinIcon />
          </React.Fragment>
        ))}
      </VStack>
      <VStack>
        <Text isTruncated fontSize={hp(1.5)}>
          {pickUp}
        </Text>
        {deliveryLocations.map((item, key) => (
          <Text fontSize={hp(1.5)} mt="10px" key={item} isTruncated>
            {item}
          </Text>
        ))}
      </VStack>
    </HStack>
  );
};

export default RequestLocations;
