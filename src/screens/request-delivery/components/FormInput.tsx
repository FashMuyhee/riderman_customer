import React from 'react';
import {View, Text, HStack, VStack} from 'native-base';
import {MultiSelectInput, PhoneInput, TextInput} from '@components';
import LocationPinIcon from '@components/icons/location-pin';
import LocationRadiusIcon from '@components/icons/location-radius';
import PlaceAutoComplete from './PlaceAutoComplete';

export type IFormInputProps = {};

const FormInput: React.FC<IFormInputProps> = ({}) => {
  return (
    <>
      <View mt="-5px">
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
      <View w="full" mt="15px">
        <Text fontSize="11px" color="grey.200">
          3. Fill Recipient’s Information
        </Text>
        <TextInput mt="10px" w="full" placeholder="Recipient’s Name" />
        <PhoneInput />
        <TextInput
          w="full"
          placeholder="Recipient’s Email"
          keyboardType="email-address"
        />
      </View>
    </>
  );
};

export {FormInput};
