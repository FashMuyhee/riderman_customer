import {hp, wp} from '@utils/responsive';
import React from 'react';
import {Image, Text, View, useTheme, Center} from 'native-base';
// @ts-ignore
import {FlatListSlider} from 'react-native-flatlist-slider';
import illus1 from '@images/illustrations/login-1.png';
import illus2 from '@images/illustrations/login-2.png';
import illus3 from '@images/illustrations/login-3.png';

const SliderImage = () => {
  const images = [
    {
      image: illus1,
      title: 'Request Pickup',
      desc: 'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt.',
    },
    {
      image: illus2,
      title: 'Track Delivery',
      desc: 'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt.',
    },
    {
      image: illus3,
      title: 'Package Delivered',
      desc: 'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt.',
    },
  ];

  const SlideItem = ({item}: {item: any}) => (
    <View w={wp(100)}>
      <Image
        h="250px"
        resizeMode="center"
        alt="illustration"
        source={item?.image}
        mt="10%"
      />
      <Center w="80%" mt="4" alignSelf="center">
        <Text bold mb="10px" textAlign="center" color="white">
          {item?.title}
        </Text>
        <Text fontSize="13px" textAlign="center" color="white" fontWeight="400">
          {item?.desc}
        </Text>
      </Center>
    </View>
  );
  const {colors} = useTheme();
  return (
    <FlatListSlider
      data={images}
      timer={10000}
      contentContainerStyle={{
        height: hp(50),
        backgroundColor: colors.main,
      }}
      indicatorActiveColor={'#fff'}
      indicatorInActiveColor={'#4e8a6a'}
      indicatorActiveWidth={35}
      indicatorStyle={{height: 10, borderRadius: 10, width: 10}}
      indicatorContainerStyle={{
        position: 'absolute',
        bottom: 10,
        width: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      loop={false}
      // @ts-ignore
      component={<SlideItem />}
    />
  );
};

export default SliderImage;
