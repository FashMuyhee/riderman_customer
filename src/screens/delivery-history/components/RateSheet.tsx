import React, {useMemo, useState} from 'react';
import {Center, HStack, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import {Button, DashedDivider, RenderSnackbar, TextInput} from '@components';
import {RATINGS_WORDS} from '@utils/constant';
import {AirbnbRating} from 'react-native-ratings';
import star from '@images/icons/star.png';
import httpHandler from '@utils/http';

const RateSheet = React.forwardRef<BottomSheet, {onClose: () => void; deliveryId: string}>(({onClose, deliveryId}, ref) => {
  const snapPoints = useMemo(() => ['60%'], []);
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
        handleClose()
        return
      }
      RenderSnackbar({
        text: `Sorry, Please Try Again`,
      });
    }
  };

  const handleClose = () => {
    setRatingNumber(0);
    setRatingReview('');
    onClose();
  };
  return (
    <BottomSheetWrapperSnappy bgColor="#fafafa" noIndicator showBackdrop index={-1} ref={ref} snapPoints={snapPoints}>
      <View>
        <HStack w="full" alignItems="center" justifyContent="space-between" px="20px">
          <View w="1/3">
            <Text onPress={handleClose} color="main" textAlign="left">
              Cancel
            </Text>
          </View>
          <View w="1/3">
            <Text fontSize={hp(1.5)} textAlign="center" fontWeight="semibold">
              Rate Delivery
            </Text>
          </View>
          <View w="1/3" />
        </HStack>
        <DashedDivider mt="5px" />
      </View>
      <BottomSheetScrollView>
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
      </BottomSheetScrollView>
    </BottomSheetWrapperSnappy>
  );
});

export default RateSheet;
