import {HStack, IBoxProps, Text, VStack} from 'native-base';
import React, {Children} from 'react';
import {Pressable, View} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import {Value} from 'react-native-reanimated';

export interface IPressableInputProps extends IBoxProps {
  value: string;
  onPress?: () => void;
  boxProps?: IBoxProps;
  disabled?: boolean;
  label?: string;
  inputBg?: string;
  inputHint?: string;
  textColor?: ColorType;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  required?: boolean;
  placeholderColor?: string | ColorType;
  placeholder?: string;
  borderColor?: string;
  borderWidth?: number;
}

const PressableInput: React.FC<IPressableInputProps> = ({
  placeholder,
  disabled,
  label,
  inputBg,
  inputHint,
  textColor = '#000000',
  rightIcon,
  leftIcon,
  required,
  onPress,
  placeholderColor = 'grey.400',
  value,
  borderWidth = 1,
  borderColor = '#D1D6DF',
  ...rest
}) => {
  return (
    <VStack {...rest} minH="50px" mb="10px">
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
          {required && (
            <Text fontSize="14px" fontWeight="600" color="main" ml="2px">
              *
            </Text>
          )}
        </HStack>
      )}
      <Pressable disabled={disabled} w="full" onPress={onPress}>
        <HStack
          borderColor={'grey.100'}
          bg={'white'}
          alignItems="center"
          justifyContent={'space-between'}
          rounded={'10px'}
          py="5px"
          px="10px"
          h="55px"
          borderWidth={1}
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
            <Text
              textAlign={'left'}
              fontSize={'12px'}
              selectionColor={'main'}
              color={value?.length > 0 ? textColor : placeholderColor}>
              {value?.length > 0 ? value : placeholder}
            </Text>
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

export {PressableInput};
