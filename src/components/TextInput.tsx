import React from 'react';
import {
  Input,
  VStack,
  IBoxProps,
  Text,
  View,
  HStack,
  Pressable,
} from 'native-base';
import {KeyboardType, ReturnKeyType} from 'react-native';
import {ColorType} from 'native-base/lib/typescript/components/types';

export interface TextInputProps extends IBoxProps {
  keyboardType?: KeyboardType;
  returnKeyType?: ReturnKeyType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onPress?: () => void;
  onSubmit?: () => void;
  boxProps?: IBoxProps;
  multiline?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
  onFocus?: () => void;
  inputBg?: string;
  inputHint?: ColorType;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  secureText?: boolean;
  onBlur?: () => void;
}

const TextInput: React.FunctionComponent<TextInputProps> = props => {
  const {
    keyboardType = 'default',
    returnKeyType = 'next',
    placeholder,
    value,
    onChange,
    onSubmit,
    multiline,
    disabled,
    autoFocus,
    label,
    onFocus,
    inputBg,
    inputHint,
    rightIcon,
    leftIcon,
    secureText,
    onPress,
    onBlur,
    ...boxProps
  } = props;

  const INPUT_HEIGHT = '37px';
  const [focus, setFocus] = React.useState(false);

  return (
    <VStack {...boxProps} minH="50px" mb="10px">
      {label && (
        <HStack>
          <Text
            mb="5px"
            color={'text'}
            textTransform={'capitalize'}
            fontSize="14px"
            fontWeight="600">
            {label}
          </Text>
        </HStack>
      )}
      <Pressable w="full" onPress={onPress}>
        <HStack
          borderColor={'grey.100'}
          bg={'white'}
          alignItems="center"
          justifyContent={'space-between'}
          rounded={'10px'}
          py="5px"
          px="10px"
          borderWidth={focus ? 2 : 1}
          space="1">
          {leftIcon && (
            <View
              h={'30px'}
              alignItems={'center'}
              justifyContent="center"
              w="30px">
              {leftIcon}
            </View>
          )}
          <View flexGrow={1}>
            <Input
              variant="unstyled"
              size="xl"
              h={multiline ? '88px' : INPUT_HEIGHT}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              placeholder={placeholder}
              fontSize={'12px'}
              selectionColor={'main'}
              value={value}
              onChangeText={onChange}
              pl="0px"
              multiline={multiline}
              numberOfLines={multiline ? 8 : 1}
              editable={!disabled}
              textAlignVertical={multiline ? 'top' : 'auto'}
              textAlign={'left'}
              autoFocus={autoFocus}
              onBlur={onBlur}
              onFocus={onFocus}
              secureTextEntry={secureText}
              w="full"
              onSubmitEditing={onSubmit}
            />
          </View>

          {rightIcon && (
            <View
              h={'30px'}
              alignItems={'center'}
              justifyContent="center"
              w="30px">
              {rightIcon}
            </View>
          )}
        </HStack>
      </Pressable>

      {/* @ts-ignore */}
      {inputHint?.length > 0 && (
        <Text
          color="textMute"
          textTransform={'capitalize'}
          fontSize="13px"
          mt="5px"
          fontWeight={'500'}>
          {inputHint}
        </Text>
      )}
    </VStack>
  );
};

export default TextInput;
