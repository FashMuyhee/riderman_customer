import React from 'react';
import {TextInput} from '@components';
import {TextInputProps} from '@components/TextInput';

export interface IPlaceAutoCompleteProps extends TextInputProps {}

const PlaceAutoComplete: React.FC<IPlaceAutoCompleteProps> = ({
  placeholder,
  boxProps,
}) => {
  return <TextInput {...boxProps} placeholder={placeholder} />;
};

export default PlaceAutoComplete;
