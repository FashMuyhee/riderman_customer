import {ScreenWrapper, Button, TextInput} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, ScrollView, HStack, Avatar, Center} from 'native-base';
import React, {useState} from 'react';
import {hp} from '@utils/responsive';
import {Rating, AirbnbRating} from 'react-native-ratings';
import MapSection from '@screens/request-delivery/components/MapSection';
import {RATINGS_WORDS, STATUSBAR_HEIGHT} from '@utils/constant';
import star from '@images/icons/star.png';
import rider from '@images/rider.png';
import NairaMoneyIcon from '@components/icons/naira-money';

interface IProps {
  navigation: StackNavigationProp<GuardStackParamList, 'payment_screen'>;
}

const RateDeliveryScreen = ({navigation}: IProps) => {
  const [rating, setRating] = useState(0);
  return (
    <ScreenWrapper barColor="white" barStyle="dark-content" translucentBar>
      <ScrollView bounces={false}>
        <View h={hp(100) + STATUSBAR_HEIGHT} w="full">
          <MapSection height={hp(100)} />
        </View>
        <View px="10px" pt="10px" bg="bg" position="absolute" bottom="0" borderTopRadius="2xl" w="full" minH={hp(60)}>
          <View mb="5%" my="10px" px="20px">
            <Text textAlign="center" bold mb="4px">
              HOW WAS THE DELIVERY?
            </Text>
            <Text textAlign="center" w="80%" alignSelf="center" fontSize={hp(1.3)}>
              Your feedback will help us improve delivery experience better.
            </Text>
          </View>
          <Center>
            <AirbnbRating
              size={28}
              starImage={star}
              // @ts-ignore
              unSelectedColor="#EEEFEF"
              starContainerStyle={{backgroundColor: 'transparent'}}
              showRating={false}
              onFinishRating={setRating}
              defaultRating={rating}
            />
            <Text color="grey.200" fontSize="12px" textAlign="center" mt="10px">
              {RATINGS_WORDS[rating - 1]}
            </Text>

            <Image rounded="full" source={rider} size={60} alignSelf="center" mt="20px" alt="rider_avatar" />
            <Text bold mt="10px">
              TIP RIDER?
            </Text>
            {/* todo add money icon */}
            <TextInput leftIcon={<NairaMoneyIcon />} keyboardType="number-pad" placeholder="Enter amount" w="full" mt="10px" />
            <Text color="grey.300" fontSize="11px">
              Riders get 100% of your tip
            </Text>
            <TextInput placeholder="Say something about Rush Delivery service?" w="full" mt="10px" />
          </Center>
          <Button title="Done" onPress={() => navigation.replace('home')} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RateDeliveryScreen;
