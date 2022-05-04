import React, {useCallback} from 'react';
import {TextInput} from '@components';
import {TextInputProps} from '@components/TextInput';
import {hp, wp} from '@utils/responsive';
import {View, Pressable, Text, FlatList, useDisclose, Input, useTheme} from 'native-base';
import {Modal} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import LocationPinIcon from '@components/icons/location';

export interface IPlaceAutoCompleteProps extends TextInputProps {}

const PlaceAutoComplete: React.FC<IPlaceAutoCompleteProps> = ({placeholder, boxProps}) => {
  const {isOpen, onClose, onOpen} = useDisclose();
  const SCREEN_HEIGHT = hp(100);
  const translateY = useSharedValue(0);
  const {colors} = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const openSearchModal = () => {
    scrollTo(-SCREEN_HEIGHT);
    onOpen();
  };

  const closeSearchModal = () => {
    scrollTo(SCREEN_HEIGHT);
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  return (
    <>
      <TextInput {...boxProps} placeholder={placeholder} onPress={() => openSearchModal()} disabled />
      <Modal visible={isOpen} transparent onRequestClose={closeSearchModal}>
        <Animated.View
          style={[
            animatedStyle,
            {
              height: SCREEN_HEIGHT,
              position: 'absolute',
              top: SCREEN_HEIGHT,
              width: wp(100),
              backgroundColor: colors.main,
            },
          ]}>
          <View bg="bg" w="full" h="full">
            <View px="15px" py="10px" w="full" h="60px" bg="main">
              <Input
                h="40px"
                rounded="xl"
                mb="10px"
                color="amber.400"
                fontSize={'12px'}
                selectionColor={'main'}
                placeholder={'Enter Location'}
                autoFocus
                returnKeyType="search"
                _focus={{bg: 'bg'}}
                bg="bg"
                borderWidth={0}
              />
            </View>
            <View bg="bg" w="full" h="full" px="10px">
              <Pressable px="15px" flexDirection="row" mt="5px" borderBottomWidth={1} pb="5px" borderBottomColor="gray.300" alignItems="center" w="full" h="45px">
                <LocationPinIcon bg={colors.main} />
                <Text ml="10px">My Location</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default PlaceAutoComplete;
