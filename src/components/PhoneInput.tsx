import React, {useRef, useState} from 'react';
import {Text, useTheme, VStack} from 'native-base';
// @ts-ignore
import TelInput from 'react-native-phone-input';

export type IPhoneInputProps = {
  onChange: (phone: string) => void;
  value: string;
};

const PhoneInput: React.FC<IPhoneInputProps> = ({onChange, value}) => {
  const {colors} = useTheme();
  const inputRef = useRef<TelInput>();
  const [isValid, setIsValid] = useState(true);

  const handleChange = (displayValue: string, iso2: string) => {
    setIsValid(inputRef.current?.isValidNumber() ? true : false);
    onChange(displayValue);
  };

  return (
    <VStack>
      <TelInput
        ref={inputRef}
        style={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.grey[100],
          borderRadius: 10,
          paddingHorizontal: 15,
          height: 57,
          marginBottom: 10,
        }}
        initialCountry="ng"
        flagStyle={{width: 25, height: 15, resizeMode: 'center'}}
        textProps={{placeholder: 'Phone', selectionColor: colors.accent}}
        textStyle={{fontFamily: 'font-regular', color: 'black', marginTop: 5}}
        onPressFlag={() => false}
        autoFormat
        initialValue={value}
        onChangePhoneNumber={handleChange}
      />
      {!isValid && (
        <Text
          color="grey.200"
          textTransform={'capitalize'}
          fontSize="13px"
          mb="5px"
          mt="-5px"
          fontWeight={'500'}>
          Invalid Phone number
        </Text>
      )}
    </VStack>
  );
};

export default PhoneInput;
