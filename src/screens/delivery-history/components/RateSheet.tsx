import React, {useMemo, useState} from 'react';
import {Center, HStack, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import {Button, DashedDivider, RenderSnackbar, TextInput} from '@components';
import {RATINGS_WORDS} from '@utils/constant';
import {AirbnbRating} from 'react-native-ratings';
import star from '@images/icons/star.png';
import httpHandler from '@utils/http';

const RateSheet = React.forwardRef<
  BottomSheet,
  {onClose: () => void; riderId: string}
>(({onClose, riderId}, ref) => {
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
        url: `/customer/rating/rider/${riderId}`,
        data: {ratingNumber: ratingNumber.toString(), ratingReview},
      });
      setIsLoading(false);
      const res = data?.data;
      if (res.status) {
        setRatingNumber(0);
        setRatingReview('');
        onClose();
        RenderSnackbar({
          text: 'Response Submitted',
        });
      } else {
        RenderSnackbar({
          text: `Sorry, Please Try Again`,
        });
      }
    } catch (error) {
      setIsLoading(false);
      RenderSnackbar({
        text: `Sorry, Please Try Again`,
      });
    }
  };

  return (
    <BottomSheetWrapperSnappy
      bgColor="#fafafa"
      noIndicator
      showBackdrop
      index={-1}
      ref={ref}
      snapPoints={snapPoints}>
      <View>
        <HStack
          w="full"
          alignItems="center"
          justifyContent="space-between"
          px="20px">
          <View w="1/3">
            <Text onPress={onClose} color="main" textAlign="left">
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
      <View px="20px" pt="10px" bg="bg" w="full">
        <View mb="5%" my="10px" px="20px">
          <Text textAlign="center" bold mb="4px">
            HOW WAS THE DELIVERY?
          </Text>
          <Text
            textAlign="center"
            w="80%"
            alignSelf="center"
            fontSize={hp(1.3)}>
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

          {/* <Image
            rounded="full"
            source={rider}
            size={60}
            alignSelf="center"
            mt="20px"
            alt="rider_avatar"
          /> */}

          <TextInput
            placeholder="Say something about[Compnay Name] service?"
            w="full"
            mt="20px"
            multiline
            onChange={setRatingReview}
            value={ratingReview}
          />
        </Center>
        <Button
          mt="20px"
          isLoading={isLoading}
          onPress={handleSubmit}
          title="Submit"
        />
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default RateSheet;
