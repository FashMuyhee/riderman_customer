import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, Text, HStack} from 'native-base';
import {ScreenWrapper, Button, FlatList, RenderSnackbar} from '@components';
import {hp} from '@utils/responsive';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SummaryItem from './components/SummaryItem';
import {RouteProp} from '@react-navigation/native';
import deliveryService from '@services/Delivery';
import {DeliveryPackage} from '@models/delivery';
import {storage} from '@services/TokenManager';
dayjs.extend(advancedFormat);

export type IDeliverySummaryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'delivery_summary'>;
  route: RouteProp<GuardStackParamList, 'delivery_summary'>;
};

const DeliverySummary: React.FC<IDeliverySummaryProps> = ({
  navigation,
  route,
}) => {
  const {item: requestData} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);

  const calcTotalDistance = async () => {
    const total = await requestData.reduce(async (p, c) => {
      const prevValue = await p;
      const {distance} = await deliveryService.calcDistanceMatrix({
        x: c.pickupLocation,
        y: c.deliveryLocation,
      });
      const distanceInKm = distance.value / 1000 + prevValue;
      return distanceInKm;
    }, Promise.resolve(0));
    setTotalDistance(total);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const deliveryLocations = requestData.map(item => {
      return item.deliveryLocation;
    });
    const deliveryPackages: DeliveryPackage[] = await Promise.all(
      requestData.map(async item => {
        const {distance} = await deliveryService.calcDistanceMatrix({
          x: item.pickupLocation,
          y: item.deliveryLocation,
        });
        return {
          deliveryInstructions: item.instruction,
          numberOfPackages: item.packageNo,
          weight: item.weight,
          recipient: {
            name: item.rName,
            phone: item.rPhone,
            email: item.rEmail,
          },
          distanceFromPickup: `${distance.value / 1000}`,
          packageCategories: item.packageTypes,
        };
      }),
    );
    try {
      const res = await deliveryService.requestPickup({
        totalDistance: totalDistance.toString(),
        deliveryLocations,
        pickupLocation: requestData[0].pickupLocation,
        deliveryPackages,
      });
      setIsLoading(false);
      if (res?.success) {
        storage.set('_pickupInfo', JSON.stringify(res.data));
        navigation.navigate('select_rider');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    calcTotalDistance();
  }, []);

  return (
    <ScreenWrapper pad={false} bgColor="#fafafa">
      <Text textAlign="center" mt="20px" color="grey.200" fontSize="13px">
        {dayjs().format('ddd, Do MMM, YYYY')}
      </Text>
      <FlatList
        px="20px"
        h="full"
        w="full"
        data={requestData}
        renderItem={({item, index}) => (
          <SummaryItem
            request={item}
            isLast={index + 1 === requestData.length}
          />
        )}
      />

      <View
        borderWidth={0.5}
        borderColor="gray.200"
        position="absolute"
        bottom="0px"
        bg="white"
        borderTopRadius="30px"
        w="full"
        px="20px"
        py="15px"
        h={hp(20)}>
        <HStack
          h="30px"
          mt="5px"
          alignItems="center"
          justifyContent="space-between">
          <Text fontSize="11px">Total Distance</Text>
          <Text fontSize="14px" fontWeight="semibold">
            {Math.round(totalDistance)}km
          </Text>
        </HStack>
        <View
          mt="20px"
          borderColor="grey.500"
          borderStyle="dashed"
          borderWidth={1}
          borderRadius="1px"
        />
        <HStack space="3" alignItems="center" mt="20px">
          <Button
            bg="black"
            title="Cancel"
            w="1/2"
            onPress={() => navigation.goBack()}
          />
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            title="Confirm"
            w="1/2"
            onPress={handleSubmit}
          />
        </HStack>
      </View>
    </ScreenWrapper>
  );
};

export default DeliverySummary;
