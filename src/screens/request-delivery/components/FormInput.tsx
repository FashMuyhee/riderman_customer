import React, {useState} from 'react';
import {View, Text, HStack, VStack, Pressable, useDisclose, IconButton, ChevronUpIcon} from 'native-base';
import {MultiSelectInput, PhoneInput, TextInput} from '@components';
import LocationPinIcon from '@components/icons/location-pin';
import LocationRadiusIcon from '@components/icons/location-radius';
import PlaceAutoComplete from './PlaceAutoComplete';
import PackageIcon from '@components/icons/package';
import DeleteIcon from '@components/icons/delete';
import {IDeliveryRequestBody, LocationValue} from '@models/delivery';

export type IFormInputProps = {
  body: IDeliveryRequestBody;
  onFormChange: (index: number, key: string) => (value: string | string[] | LocationValue) => void;
  index: number;
  isLast: Boolean;
  isFirst: Boolean;
  onDelete: (index: number) => void;
};

type FilledFormProps = {
  index: number;
};
const FormInput: React.FC<IFormInputProps> = ({body, onFormChange, index, isLast, isFirst, onDelete}) => {
  const {isOpen, onToggle} = useDisclose();

  const FilledForm = ({index}: FilledFormProps) => {
    return (
      <>
        <Pressable mt="10px" mb="10px" onPress={onToggle}>
          <View
            bg="white"
            borderWidth={1}
            rounded="lg"
            // h="80px"
            p="10px"
            borderColor="grey.500">
            <HStack alignItems="center">
              <PackageIcon />
              <Text w="4/5" mx="10px" fontSize="11px" bold>
                Delivery {index + 1}
              </Text>
              <IconButton _pressed={{bg: 'red.50'}} onPress={() => onDelete(index)} icon={<DeleteIcon />} mr="20px" />
            </HStack>
            <HStack space="2" alignItems="center" mt="10px">
              <VStack justifyContent="center" alignItems="center">
                <LocationRadiusIcon />
                <View borderColor="accent" borderWidth={2} h="20px" />
                <LocationPinIcon />
              </VStack>
              <VStack w="93%" space="2">
                <Text fontSize="11px" isTruncated>
                  {body.pickupLocation.address}
                </Text>
                <Text fontSize="11px" isTruncated>
                  {body.deliveryLocation.address}
                </Text>
              </VStack>
            </HStack>
          </View>
        </Pressable>
        <View borderBottomWidth={1} borderBottomColor="grey.500" w="full" borderStyle="dashed" mb="10px" />
      </>
    );
  };

  return isLast || isOpen ? (
    <>
      <View mt="15px">
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="11px" color="grey.200">
            {isFirst ? ' 1. Select Pickup & Delivery Locations' : ' 1. Select Delivery Locations'}
          </Text>
          {!isLast && <IconButton _pressed={{bg: 'coolGray.50'}} onPress={onToggle} icon={<ChevronUpIcon size={3} color="coolGray.300" />} />}
        </HStack>
        <HStack space="2" alignItems="center" mt="4">
          <VStack justifyContent="center" alignItems="center">
            {isFirst ? (
              <>
                <LocationRadiusIcon />
                <View borderColor="accent" borderWidth={2} h="35px" />
                <LocationPinIcon />
              </>
            ) : (
              <LocationPinIcon />
            )}
          </VStack>
          <VStack w="93%">
            {isFirst ? (
              <>
                <PlaceAutoComplete placeholder="Pickup:" value={body.pickupLocation.address} onPlaceChange={onFormChange(index, 'pickupLocation')} />
                <PlaceAutoComplete placeholder="Delivery:" value={body.deliveryLocation.address} onPlaceChange={onFormChange(index, 'deliveryLocation')} />
              </>
            ) : (
              <PlaceAutoComplete placeholder="Delivery:" value={body.deliveryLocation.address} onPlaceChange={onFormChange(index, 'deliveryLocation')} />
            )}
          </VStack>
        </HStack>
      </View>
      <View w="full" mt="15px">
        <Text fontSize="11px" color="grey.200" mb="4">
          2. Fill Packaging Information
        </Text>
        <MultiSelectInput placeholder="Add a Package" values={body.packageTypes} title="Select  Packages" onSelect={onFormChange(index, 'packageTypes')} />
        <HStack space="2" alignItems="center">
          <TextInput w="48%" placeholder="Weight in kg" keyboardType="numeric" value={body.weight} onChange={onFormChange(index, 'weight')} />
          <TextInput w="48%" placeholder="No. of Package" keyboardType="numeric" value={body.packageNo} onChange={onFormChange(index, 'packageNo')} />
        </HStack>
        <TextInput w="full" placeholder="Delivery Instructions (Optional)" value={body.instruction} onChange={onFormChange(index, 'instruction')} />
      </View>
      <View w="full" mt="15px">
        <Text fontSize="11px" color="grey.200">
          3. Fill Recipient’s Information
        </Text>
        <TextInput mt="10px" w="full" placeholder="Recipient’s Name" value={body.rName} onChange={onFormChange(index, 'rName')} />
        <PhoneInput value={body.rPhone} onChange={onFormChange(index, 'rPhone')} />
        <TextInput w="full" placeholder="Recipient’s Email" keyboardType="email-address" value={body.rEmail} onChange={onFormChange(index, 'rEmail')} />
      </View>
    </>
  ) : (
    <FilledForm index={index} />
  );
};

export default FormInput;
