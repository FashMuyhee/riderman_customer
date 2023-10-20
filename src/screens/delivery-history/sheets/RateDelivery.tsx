import React, {useState} from 'react';
import {Center, Text, View} from 'native-base';
import {hp} from '@utils/responsive';
import {Button, RenderSnackbar, TextInput} from '@components';
import {RATINGS_WORDS} from '@utils/constant';
import {AirbnbRating} from 'react-native-ratings';
import star from '@images/icons/star.png';
import httpHandler from '@utils/http';
import {RouteScreenProps} from 'react-native-actions-sheet';
import { NavigationHeader } from './components';

export const RateDeliverySheet = ({params, router}: RouteScreenProps) => {
  const {deliveryId} = params;
  const [ratingReview, setRatingReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ratingNumber, setRatingNumber] = useState(0);

  const handleSubmit = async () => {
    if (ratingNumber == 0) {
      RenderSnackbar({
        text: 'You need to select a rate before submitting review',
      });
      return;
    }
    if (!ratingReview) {
      RenderSnackbar({
        text: 'Please enter delivery experience',
      });
      return;
    }
    try {
      setIsLoading(true);
      const {data} = await httpHandler({
        method: 'post',
        url: `/customer/rate-deliveries/${deliveryId}`,
        data: {ratingNumber: ratingNumber.toString(), ratingReview},
      });
      setIsLoading(false);
      const res = data?.data;
      if (res.status) {
        handleClose();
        RenderSnackbar({
          text: 'Response Submitted',
        });
      } else {
        if (res?.errors) {
          if (!!res?.errors?.delivery && res?.errors?.delivery[0] == 'The delivery has already been taken.') {
            RenderSnackbar({
              text: 'You already rated this delivery',
            });
          }
          return;
        }

        RenderSnackbar({
          text: `Sorry, Please Try Again`,
        });
      }
    } catch (error) {
      setIsLoading(false);
      //@ts-ignore
      const errorMgs = error.response.data;
      if (!!errorMgs?.errors?.delivery && errorMgs?.errors?.delivery[0].toLowerCase() == 'the delivery has already been taken.') {
        RenderSnackbar({
          text: 'You already rated this delivery',
        });
        handleClose();
        return;
      }
      RenderSnackbar({
        text: `Sorry, Please Try Again`,
      });
    }
  };

  const handleClose = () => {
    setRatingNumber(0);
    setRatingReview('');
    router.goBack();
  };

  return (
    <View h="full">
      <NavigationHeader title="Rate Delivery" onClose={() => router.goBack()} />
      <View px="20px" pt="10px" bg="bg" w="full">
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
            onFinishRating={setRatingNumber}
            defaultRating={ratingNumber}
          />
          <Text color="grey.200" fontSize="12px" textAlign="center" mt="10px">
            {RATINGS_WORDS[ratingNumber - 1]}
          </Text>

          <TextInput
            placeholder="Say something about our service?"
            w="full"
            mt="20px"
            multiline
            onChange={setRatingReview}
            value={ratingReview}
          />
        </Center>
        <Button mt="20px" isLoading={isLoading} onPress={handleSubmit} title="Submit" />
      </View>
    </View>
  );
};
