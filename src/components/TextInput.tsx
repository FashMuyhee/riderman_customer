import React from 'react';
import {Input, VStack, IBoxProps, Text, View, HStack, Pressable, useTheme, Divider} from 'native-base';
import {KeyboardType, ReturnKeyType} from 'react-native';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {INPUT_HEIGHT} from '@utils/constant';
import { isEmptyString } from '@utils/helper';

export type HintType = 'warning' | 'error' | 'success' | 'default';

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
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  secureText?: boolean;
  onBlur?: () => void;
  isBottomSheet?: boolean;
  labelColor?: ColorType;
  leftIconDivider?: boolean;
  hintType?: HintType;
  hintMessage?: string;
  hasError?: boolean;
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
    hintMessage,
    hasError = false,
    hintType,
    rightIcon,
    leftIcon,
    secureText,
    onPress,
    onBlur,
    isBottomSheet,
    textAlign = 'left',
    labelColor = 'black',
    leftIconDivider = false,
    ...boxProps
  } = props;

  const [focus, setFocus] = React.useState(false);
  const {colors} = useTheme();

  const getBorderColor = () => {
    let color = 'grey.600';
    if (hasError) {
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
      color = 'grey.100';
    }

    return color;
  };

  return (
    <VStack {...boxProps} minH="50px" mb="10px">
      {label && (
        <HStack>
          <Text mb="5px" color={labelColor} fontSize="14px" fontWeight="600">
            {label}
          </Text>
        </HStack>
      )}
      <Pressable w="full" onPress={onPress}>
        <HStack borderColor={'#eee'} bg={'white'} alignItems="center" justifyContent={'space-between'} rounded={'6px'} py="5px" px="10px" borderWidth={focus ? 2 : 1} space="1">
          {leftIcon && (
            <HStack h={'30px'} alignItems={'center'} w="30px">
              {leftIcon}
              {leftIconDivider && <Divider orientation="vertical" ml="5px" color="#EEEEEE" />}
            </HStack>
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
              pl="5px"
              multiline={multiline}
              numberOfLines={multiline ? 8 : 1}
              editable={!disabled}
              textAlignVertical={multiline ? 'top' : 'auto'}
              textAlign={textAlign}
              autoFocus={autoFocus}
              onBlur={onBlur}
              onFocus={onFocus}
              secureTextEntry={secureText}
              w="full"
              onSubmitEditing={onSubmit}
            />
          </View>

          {rightIcon && (
            <View h={'30px'} alignItems={'center'} justifyContent="center" w="30px">
              {rightIcon}
            </View>
          )}
        </HStack>
      </Pressable>

      {/* @ts-ignore */}
      {hintMessage?.length > 0 && (
          <Text
            color={getBorderColor()}
            textTransform='capitalize'
            fontSize="12px"
            italic
            fontWeight={'500'}>
            {hintMessage}
          </Text>
        )}
    </VStack>
  );
};

export default TextInput;
