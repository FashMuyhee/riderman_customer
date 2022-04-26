import React from 'react';
import {ChevronDownIcon} from 'native-base';
import {TextInput} from '@components';
import {TextInputProps} from './TextInput';

export interface IMultiSelectInputProps extends TextInputProps {}

const MultiSelectInput: React.FC<IMultiSelectInputProps> = ({
  boxProps,
  placeholder,
}) => {
  return (
    <TextInput
      {...boxProps}
      placeholder={placeholder}
      rightIcon={<ChevronDownIcon color="grey.300" size={3} />}
    />
  );
};

export default MultiSelectInput;
