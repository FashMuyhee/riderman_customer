import React from 'react';
import {View, Text, HStack, VStack} from 'native-base';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {MultiSelectInput, ScreenWrapper, TextInput} from '@components';
import LocationPinIcon from '@components/icons/location-pin';
import LocationRadiusIcon from '@components/icons/location-radius';
import PlaceAutoComplete from './components/PlaceAutoComplete';

export type IRequestDeliveryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'request_delivery'>;
};

const RequestDelivery: React.FC<IRequestDeliveryProps> = ({navigation}) => {
  return (
    <ScreenWrapper pad>
      <View mt="-15px">
        <Text fontSize="11px" color="grey.200">
          1. Select Pickup & Delivery Locations
        </Text>
        <HStack space="2" alignItems="center" mt="4">
          <VStack justifyContent="center" alignItems="center">
            <LocationRadiusIcon />
            <View borderColor="accent" borderWidth={2} h="35px" />
            <LocationPinIcon />
          </VStack>
          <VStack w="93%">
            <PlaceAutoComplete placeholder="Pickup:" />
            <PlaceAutoComplete placeholder="Delivery:" />
          </VStack>
        </HStack>
      </View>

      <View w="full" mt="15px">
        <Text fontSize="11px" color="grey.200">
          2. Fill Packaging Information
        </Text>
        <HStack space="2" alignItems="center" mt="4">
          <View w="58%">
            <MultiSelectInput placeholder="Add a Package" />
          </View>
          <TextInput
            w="38%"
            placeholder="No. of Package"
            keyboardType="numeric"
          />
        </HStack>
        <TextInput w="full" placeholder="Delivery Instructions (Optional)" />
      </View>
    </ScreenWrapper>
  );
};

export {RequestDelivery};
