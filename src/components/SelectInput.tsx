// import {IS_TABLET} from '@utils/constant';
import {handleSearchList} from '@utils/data-sorter';
import {
  Center,
  HStack,
  Pressable,
  Text,
  useDisclose,
  useTheme,
  View,
  IBoxProps,
  Input,
  CheckIcon,
  SearchIcon,
  ChevronDownIcon,
} from 'native-base';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React, {memo, useState} from 'react';
import {Modal, FlatList} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {PressableInput} from './PressableInput';

type Option = {
  label: string;
  value: string;
};
interface SelectOptionsPros extends IBoxProps {
  options: Option[] | any[] | undefined;
  onChange?: (item: string) => void;
  value: string;
  label?: string;
  inputBg?: string;
  placeholder?: string;
  boxProps?: IBoxProps;
  disabled?: boolean;
  withSearch?: boolean;
  searchPlaceholder?: string;
  inputHint?: string;
  textColor?: ColorType;
  transform?: boolean;
  multiDisplayKey?: boolean;
  displayKey?: string;
  displayKeySecondary?: string;
  valueKey?: string;
  isLoading?: boolean;
  extraButton?: boolean;
  onPressExtraButton?: () => void;
  extraButtonText?: string;
}

export type SelectOptionsRef = {
  openSelect: () => void;
};

const SelectInput = React.forwardRef<SelectOptionsRef, SelectOptionsPros>(
  (
    {
      onChange,
      options,
      value,
      label,
      placeholder,
      inputBg = 'bg',
      disabled,
      withSearch = false,
      inputHint,
      textColor = '#000000',
      searchPlaceholder = 'Search List',
      displayKey,
      valueKey,
      transform,
      multiDisplayKey = false,
      displayKeySecondary,
      isLoading,
      extraButton,
      extraButtonText,
      onPressExtraButton,
    },
    ref,
  ) => {
    const {isOpen, onOpen, onClose} = useDisclose();
    const {colors} = useTheme();
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [result, setResult] = useState<Option[]>([]);

    const transformData = options?.map((item: {[x: string]: any}) => {
      return {
        // @ts-ignore
        label: multiDisplayKey
          ? `${item[displayKey]} ${item[displayKeySecondary]}`
          : item[displayKey],
        // @ts-ignore
        value: item[valueKey],
      };
    });

    const OPTION_LIST = transform ? transformData : options;

    const SelectItem = ({item}: {item: Option}) => {
      const isSelected = item.value === value ? true : false;
      return (
        <Pressable
          onPress={() => {
            // @ts-ignore
            onChange(item.value);
            onClose();
          }}
          mb="10px">
          <HStack
            bg={isSelected ? 'green.50' : 'transparent'}
            h="45px"
            justifyContent="space-between"
            alignItems={'center'}
            space="2"
            w="full"
            p="8px"
            rounded="sm">
            <Text textTransform={'capitalize'}>{item.label}</Text>
            {isSelected && (
              <Center bg="green.300" w="25px" h="25px" rounded="full">
                <CheckIcon size={4} color={colors.white} />
              </Center>
            )}
          </HStack>
        </Pressable>
      );
    };
    const MemoizedSelectItem = memo(SelectItem);

    /**
     * get the label for the value value
     */
    const selectedValue = () => {
      // @ts-ignore
      const selectOptions = Array.isArray(OPTION_LIST) ? OPTION_LIST : [];
      const findValue = selectOptions?.find(el => el?.value === value);
      // @ts-ignore
      if (findValue?.label?.length > 30) {
        return findValue?.label.slice(0, 30).concat('...');
      }
      return findValue?.label;
    };

    const handleSearch = (text: string) => {
      setQuery(text);
      const result = handleSearchList({
        data: OPTION_LIST,
        query: text,
        searchKeys: ['label'],
      });
      // @ts-ignore
      setResult(result);
    };

    const scaleValue = useSharedValue(1);

    const animate = () => {
      if (isOpen) {
        setActive(true);
        scaleValue.value = withSpring(1, {damping: 40});
      } else {
        // setActive(false);
        setTimeout(() => {
          setActive(false);
        }, 10);
        scaleValue.value = withTiming(0);
      }
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scaleValue.value}],
      };
    });

    React.useImperativeHandle(ref, () => ({openSelect: onOpen}), []);

    /**
     * renders search bar component
     * @returns
     */
    const renderSearchBarHeader = () => {
      return (
        <HStack
          borderTopRadius={'10px'}
          h="50px"
          bg="main"
          alignItems={'center'}
          px="20px"
          space="1">
          <SearchIcon color={colors.white} size={4} />
          <Input
            h="35px"
            placeholder={searchPlaceholder}
            value={query}
            onChangeText={handleSearch}
            returnKeyType="search"
            w="90%"
            ml="-5px"
            borderWidth={0}
            fontSize={'14px'}
            color="white"
            selectionColor={'accent'}
            // @ts-ignore
            placeholderTextColor={'coolGray.50'}
            _focus={{
              backgroundColor: 'transparent',
            }}
          />
        </HStack>
      );
    };

    /**
     * renders flat list
     * @returns
     */
    const renderFlatList = () => {
      return (
        <FlatList
          keyboardShouldPersistTaps="always"
          removeClippedSubviews
          showsVerticalScrollIndicator={withSearch}
          data={query.length > 1 ? result : OPTION_LIST}
          // initialNumToRender={20}
          renderItem={({item}) => <MemoizedSelectItem item={item} />}
          keyExtractor={(index, key) => key.toString()}
          style={{paddingHorizontal: 10, paddingTop: 10}}
          ListEmptyComponent={
            <Text mt="8" textAlign={'center'}>
              Sorry No Item
            </Text>
          }
        />
      );
    };

    React.useEffect(() => {
      animate();
    }, [isOpen]);

    return (
      <>
        {ref ? null : (
          <PressableInput
            rightIcon={
              <View
                style={{width: 30}}
                justifyContent={'center'}
                alignItems="center"
                flexDir={'column'}>
                <ChevronDownIcon size={4} color={colors.grey['300']} />
              </View>
            }
            placeholder={placeholder}
            label={label}
            inputBg={inputBg}
            disabled={disabled}
            onPress={onOpen}
            textColor={textColor}
            // @ts-ignore
            value={selectedValue()}
            inputHint={inputHint}
          />
        )}
        <Modal visible={active} onRequestClose={onClose} transparent>
          <Center w="full" h="full" alignSelf={'center'} bg="rgba(0,0,0,.1)">
            <Pressable onPress={onClose} w="full" h="full" />
            <Animated.View
              style={[
                animatedStyle,
                {
                  backgroundColor: '#f4f4f4',
                  borderRadius: 10,
                  // width: IS_TABLET ? '60%' : '90%',
                  width: '90%',
                  height: withSearch ? '70%' : 183,
                  position: 'absolute',
                  paddingBottom: 15,
                },
              ]}>
              {withSearch && renderSearchBarHeader()}
              {isLoading ? (
                <View h="45px" mt="5px">
                  <Text textAlign={'center'}>Loading Items ...</Text>
                </View>
              ) : (
                renderFlatList()
              )}
              {extraButton && (
                <Text
                  color="main"
                  textAlign="center"
                  onPress={() => {
                    onClose();
                    // @ts-ignore
                    onPressExtraButton();
                  }}>
                  {extraButtonText}
                </Text>
              )}
            </Animated.View>
          </Center>
        </Modal>
      </>
    );
  },
);

export default SelectInput;
