import React, {createRef} from 'react';
import {
  ChevronDownIcon,
  Text,
  View,
  Pressable,
  FlatList,
  Circle,
  IBoxProps,
  HStack,
  CheckIcon,
  CloseIcon,
  IconButton,
} from 'native-base';
import {BottomSheetWrapper} from '@components';
import RBSheet from 'react-native-raw-bottom-sheet';
import {packageTypes} from '@utils/sample-data';
import {hp} from '@utils/responsive';

export interface IMultiSelectInputProps {
  values: string[];
  onSelect: (item: string[]) => void;
  data?: Array<string>;
  placeholder: string;
  width?: string;
  height?: string;
  title?: string;
}

const MultiSelectInput: React.FC<IMultiSelectInputProps> = ({
  width,
  height = '55px',
  placeholder,
  values,
  onSelect,
  data = packageTypes,
  title = 'Select Items',
}) => {
  const bottomSheetRef = createRef<RBSheet>();

  type SelectItemProps = {
    item: string;
    last: boolean;
    isSelect: boolean;
  };

  const SelectItem = ({item, last, isSelect}: SelectItemProps) => {
    const handleSelect = () => {
      if (isSelect) {
        const newValue = values.filter(ele => ele !== item);
        onSelect(newValue);
      } else {
        onSelect([...values, item]);
      }
    };

    return (
      <Pressable
        onPress={handleSelect}
        h="50px"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        borderColor={'gray.200'}
        borderTopWidth={1}
        borderBottomWidth={last ? 1 : 0}>
        <Text color="grey.400" textTransform="capitalize" px="10px">
          {item}
        </Text>
        {isSelect && (
          <Circle bg="success.500" size={5} mr="10px">
            <CheckIcon color="white" />
          </Circle>
        )}
      </Pressable>
    );
  };

  const SelectedItem = ({item}: {item: string}) => {
    const handleRemoveItem = () => {
      const newValue = values.filter(ele => ele !== item);
      onSelect(newValue);
    };

    return (
      <View
        flexDir="row"
        alignItems="center"
        bg="success.500"
        px="6px"
        py="3px"
        rounded="md">
        <Text
          isTruncated
          color="white"
          fontSize="11px"
          w="55px"
          textTransform="capitalize">
          {item}
        </Text>
        <IconButton
          onPress={handleRemoveItem}
          size={5}
          icon={<CloseIcon size={2} color="white" />}
        />
      </View>
    );
  };

  const isSelected = (item: string) => {
    const find = values.findIndex(el => el === item);

    return find === -1 ? false : true;
  };
  const COUNT = values.length;
  const LIMIT = 3;
  const selectedValues = [...values];
  return (
    <>
      <Pressable
        w={width}
        rounded={'10px'}
        px="15px"
        h={height}
        mb="10px"
        borderColor={'grey.100'}
        borderWidth={1}
        justifyContent="space-between"
        alignItems="center"
        flexDir="row"
        bg="white"
        onPress={() => bottomSheetRef.current?.open()}>
        <View w="93%">
          {values.length === 0 ? (
            <Text color={'gray.400'} fontSize={'12px'}>
              {placeholder}
            </Text>
          ) : (
            <HStack space="1" alignItems="center" justifyContent="flex-start">
              {selectedValues.splice(0, LIMIT).map((i, key) => (
                <SelectedItem item={i} key={key} />
              ))}
              {COUNT > LIMIT && (
                <Text fontSize="11px" color="main">
                  {`+${COUNT - LIMIT}`}
                </Text>
              )}
            </HStack>
          )}
        </View>
        <ChevronDownIcon color="grey.300" size={3} />
      </Pressable>
      <BottomSheetWrapper
        ref={bottomSheetRef}
        height={hp(55)}
        isBackDrop={false}>
        <View mb="10px" px="20px">
          <Text textAlign="center" bold>
            {title}
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <SelectItem
              item={item}
              last={index === data.length - 1}
              isSelect={isSelected(item)}
            />
          )}
          keyExtractor={index => index.toString()}
          px="20px"
        />
      </BottomSheetWrapper>
    </>
  );
};

export default MultiSelectInput;
