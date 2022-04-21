import React from 'react';
import {useTheme} from 'native-base';
//@ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export type IPinInputProps = {
  value: string;
  onChange: (token: string) => void;
  onFinish: (token: string) => void;
};

const PinInput: React.FC<IPinInputProps> = ({value, onChange, onFinish}) => {
  const {colors} = useTheme();
  return (
    <SmoothPinCodeInput
      password={false}
      value={value}
      onTextChange={onChange}
      onFulfill={onFinish}
      codeLength={6}
      cellSpacing={10}
      autoFocus
      restrictToNumbers
      containerStyle={{
        alignSelf: 'center',
      }}
      cellSize={50}
      cellStyleFocused={{
        borderColor: colors.main,
        borderWidth: 1,
      }}
      textStyle={{color: colors.text, fontSize: 20}}
      cellStyle={{
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.grey[100],
      }}
      keyboardType="numeric"
    />
  );
};

export default PinInput;
