import React, {useCallback, useState} from 'react';
import {PressableInput} from '@components';
import {TextInputProps} from '@components/TextInput';
import {hp, wp} from '@utils/responsive';
import {View, Pressable, Text, useDisclose, Input, useTheme, Skeleton, HStack} from 'native-base';
import {Modal, Platform} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import LocationIcon from '@components/icons/location';
import HistoryIcon from '@components/icons/history';
import LocationPinIcon from '@components/icons/location-pin';
import placeAPI from './placeApi';
import {useDebounce} from '@hooks/useDebounce';
import {LocationValue} from '@models/delivery';
import useGetLocation from '@hooks/useGetLocation';

export type PlacePredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: Array<any>;
    secondary_text: string;
  };
  terms: Object[];
  types: string[];
};

export interface IPlaceAutoCompleteProps extends TextInputProps {
  value: string;
  onPlaceChange: (location: LocationValue) => void;
}

export type LocationItemProps = {
  onPress: (place_id: string, des: string) => void;
  predictions: PlacePredictionType;
  isHistory: boolean;
};

/**
 * place item
 * @param param0
 * @returns
 */
const LocationItem = ({onPress, predictions, isHistory}: LocationItemProps) => {
  return (
    <Pressable
      onPress={() => onPress(predictions?.place_id, predictions.description)}
      borderBottomWidth={1}
      borderBottomColor="gray.300"
      p="10px"
      h="65px"
      w="full"
      mt="5px"
      flexDir="row"
      alignItems="flex-start"
      justifyContent="flex-start">
      {isHistory ? <HistoryIcon /> : <LocationPinIcon />}
      <View ml="10px">
        <Text isTruncated w={wp(85)} fontSize="13px">
          {predictions.description}
        </Text>
        <Text fontWeight="400" fontSize="13px" color="grey.200">
          {predictions.structured_formatting?.secondary_text}
        </Text>
      </View>
    </Pressable>
  );
};

const PlaceAutoComplete: React.FC<IPlaceAutoCompleteProps> = ({placeholder, boxProps, onPlaceChange, value}) => {
  const {isOpen, onClose, onOpen} = useDisclose();
  const SCREEN_HEIGHT = hp(100);
  const translateY = useSharedValue(0);
  const {colors} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePredictionType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const {location} = useGetLocation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50, stiffness: 250});
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

  const handleOnQueryChange = async () => {
    if (searchQuery.trim() === '') return;
    try {
      setIsLoadingSuggestions(true);
      const res = await placeAPI.getPlaceSuggestions(searchQuery);
      setShowSuggestions(true);
      setSuggestions(res);
      setIsLoadingSuggestions(false);
    } catch (error) {
      setIsLoadingSuggestions(false);
    }
  };

  useDebounce(handleOnQueryChange, 1000, [searchQuery]);

  /**
   * render place item
   * @param placePredictions
   * @param isHistory
   * @returns
   */
  const _renderPlacesPrediction = (placePredictions: PlacePredictionType[] | Array<any>, isHistory: boolean) => {
    /**
     * get place lat and longitude on press
     * @param placeId
     */
    const handlePressLocation = async (placeId: string, desc: string) => {
      try {
        const res: {lat: number; lng: number} = await placeAPI.getPlaceID(placeId);
        onPlaceChange({address: desc, lat: res.lat.toString(), long: res.lng.toString()});
        closeSearchModal();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        {placePredictions?.map((item, key) => (
          <LocationItem isHistory={isHistory} predictions={item} key={key} onPress={handlePressLocation} />
        ))}
      </>
    );
  };

  // get current location
  const handleGetAddressFromLocation = async () => {
    try {
      const res = await placeAPI.getCurrentLocationAddress({address: '', lat: location?.coords.latitude.toString() as string, long: location?.coords.longitude.toString() as string});
      closeSearchModal();
      onPlaceChange(res as LocationValue);
    } catch (error) {
      console.log(error);
    }
  };

  const _renderLoader = () => (
    <HStack alignItems="center" mt="10px">
      <View width="15%" justifyContent="center" alignItems="center">
        <Skeleton size="25px" rounded="full" endColor="coolGray.300" startColor="coolGray.100" />
      </View>
      <Skeleton w="85%" endColor="coolGray.300" startColor="coolGray.100" />
    </HStack>
  );

  return (
    <>
      <PressableInput value={value} placeholder={placeholder} onPress={() => openSearchModal()} />
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
                fontSize={'14px'}
                selectionColor={'main'}
                placeholder={'Enter Location'}
                autoFocus
                returnKeyType="search"
                _focus={{bg: 'bg'}}
                bg="bg"
                borderWidth={0}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View bg="bg" w="full" h="full" px="10px">
              {/* current location pin */}
              <Pressable
                onPress={handleGetAddressFromLocation}
                px="15px"
                flexDirection="row"
                mt="5px"
                pb="5px"
                borderBottomWidth={1}
                borderBottomColor="gray.300"
                alignItems="center"
                w="full"
                h="45px">
                <LocationIcon bg={colors.main} />
                <Text ml="10px">My Location</Text>
              </Pressable>
              {isLoadingSuggestions && _renderLoader()}
              {/* history */}
              {/* search result */}
              {showSuggestions && _renderPlacesPrediction(suggestions, false)}
            </View>
            {Platform.OS === 'ios' && (
              <Text color="main" textAlign="center" left="45%" right="45%" bottom="3%" fontSize="12px" position="absolute" onPress={closeSearchModal}>
                Close
              </Text>
            )}
          </View>
        </Animated.View>
      </Modal>
    </>
  );
};

export default PlaceAutoComplete;
