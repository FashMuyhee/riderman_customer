import React, {createRef} from 'react';
import {
  ChevronDownIcon,
  Divider,
  Text,
  View,
  Pressable,
  FlatList,
} from 'native-base';
import {BottomSheetWrapper, TextInput} from '@components';
import {TextInputProps} from './TextInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import {packageType} from '@utils/sample-data';
import {hp} from '@utils/responsive';

export interface IMultiSelectInputProps extends TextInputProps {}

const MultiSelectInput: React.FC<IMultiSelectInputProps> = ({
  boxProps,
  placeholder,
}) => {
  const bottomSheetRef = createRef<RBSheet>();

  const SelectItem = ({item, last}: {item: string; last: boolean}) => {
    return (
      <Pressable
        h="50px"
        justifyContent="center"
        borderColor={'gray.200'}
        borderTopWidth={1}
        borderBottomWidth={last ? 1 : 0}>
        <Text color="grey.400" textTransform="capitalize" px="10px">
          {item}
        </Text>
      </Pressable>
    );
  };
  return (
    <>
      <TextInput
        {...boxProps}
        placeholder={placeholder}
        rightIcon={<ChevronDownIcon color="grey.300" size={3} />}
        onPress={() => bottomSheetRef.current?.open()}
        disabled
      />

      <BottomSheetWrapper ref={bottomSheetRef} height={hp(55)}>
        <View mb="10px" px="20px">
          <Text textAlign="center" bold>
            Select a Package
          </Text>
        </View>
        <FlatList
          data={packageType}
          renderItem={({item, index}) => (
            <SelectItem item={item} last={index === packageType.length - 1} />
          )}
          keyExtractor={index => index.toString()}
          px="20px"
        />
      </BottomSheetWrapper>
    </>
  );
};

export default MultiSelectInput;
