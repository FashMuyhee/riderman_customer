import React, {useRef, useState} from 'react';
import {Text, useTheme, VStack} from 'native-base';
// @ts-ignore
import TelInput from 'react-native-phone-input';
import {FONT} from '@utils/constant';
import {HintType} from './TextInput';
import {isEmptyString} from '@utils/helper';
import {HStack} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';

export type IPhoneInputProps = {
  onChange: (phone: string) => void;
  onSubmit?: () => void;
  value: string;
  hintType?: HintType;
  hintMessage?: string;
  hasError?: boolean;
  disabled?: boolean;
  labelColor?: ColorType;
  labelWeight?: any;
  labelSize?: number;
  label?: string;
};

const PhoneInput = React.forwardRef<TelInput, IPhoneInputProps>(
  ({onChange, value, hintMessage, hintType, hasError, onSubmit, disabled, label, labelColor, labelSize = 14, labelWeight = '600'}, ref) => {
    const {colors} = useTheme();
    const inputRef = useRef<TelInput>();
    const [isValid, setIsValid] = useState(true);

    const handleChange = (displayValue: string, iso2: string) => {
      setIsValid(inputRef.current?.isValidNumber() ? true : false);
      onChange(displayValue);
    };

    const getBorderColor = () => {
      let color = colors.grey[500];

      if (!isValid || hasError) {
        color = colors.error[400];
      } else if (hintType == 'warning') {
        color = colors.warning[500];
      } else if (hintType == 'success') {
        color = colors.success[500];
      } else if (hintType == 'error') {
        color = colors.error[400];
      } else if (!isEmptyString(value)) {
        color = colors.success[500];
      } else {
        color = colors.grey[100];
      }

      return color;
    };

    // @ts-ignore
    React.useImperativeHandle(ref, () => ({setValue: inputRef?.current?.setValue}), []);

    return (
      <VStack>
        {label && (
          <HStack>
            <Text mb="5px" color={labelColor} fontSize={`${labelSize}px`} fontWeight={labelWeight}>
              {label}
            </Text>
          </HStack>
        )}
        <TelInput
          // @ts-ignore
          ref={inputRef}
          style={{
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: getBorderColor(),
            borderRadius: 10,
            paddingHorizontal: 15,
            height: 50,
            marginBottom: 10,
          }}
          initialCountry="ng"
          flagStyle={{width: 25, height: 15, resizeMode: 'center'}}
          textProps={{placeholder: 'Phone', selectionColor: colors.accent, onSubmitEditing: onSubmit, editable: !disabled}}
          textStyle={{fontFamily: FONT.REGULAR, color: 'black'}}
          onPressFlag={() => false}
          autoFormat
          initialValue={value}
          onChangePhoneNumber={handleChange}
        />
        {!isValid && (
          <Text color="error.400" textTransform={'capitalize'} fontSize="12px" italic fontWeight={'500'}>
            Invalid Phone number
          </Text>
        )}
        {/* @ts-ignore */}
        {hintMessage?.length > 0 && (
          <Text color={getBorderColor()} textTransform={'capitalize'} fontSize="12px" italic fontWeight={'500'}>
            {hintMessage}
          </Text>
        )}
      </VStack>
    );
  },
);

export default PhoneInput;
