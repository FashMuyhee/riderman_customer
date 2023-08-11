import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ChevronRightIcon, HStack, Pressable, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import {MoneyText, Rating, RenderSnackbar, RidermanAvatar} from '@components';
import SelectPaymentMethod from './SelectPaymentMethod';
import {PaymentMethod, PickupRequestInfo, RiderCloseBy} from '@models/delivery';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GuardStackParamList} from '@navigations/param-list';
import deliveryService from '@services/Delivery';
import {storage} from '@services/TokenManager';

export interface SelectRiderProps {
  handleCompanyInfo: (companyId: string) => void;
}

const SelectRiderModal = React.forwardRef<BottomSheet, SelectRiderProps>(
  ({handleCompanyInfo}, ref) => {
    const snapPoints = useMemo(() => ['60%'], []);
    const {navigate} = useNavigation<NavigationProp<GuardStackParamList>>();
    const [paymentChannel, setPaymentChannel] = useState<PaymentMethod>('cash');
    const [riders, setRiders] = useState<RiderCloseBy[]>([]);
    const pickpInfo = storage.getString('_pickupInfo');
    const parsedPickupInfo = JSON.parse(
      pickpInfo as string,
    ) as PickupRequestInfo;
    const [rider, setRider] = useState<{riderId: string; totalAmount: string}>({
      totalAmount: '0',
      riderId: '0',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRiders, setIsLoadingRiders] = useState(false);

    const loadRiders = async () => {
      try {
        setIsLoadingRiders(true);
        const res = await deliveryService.getCloseByRiderByPickupLocation(
          parsedPickupInfo.pickupRequestId.toString(),
        );
        if (res?.success) {
          setRiders(res.data.riders);
          setIsLoadingRiders(false);
        }
      } catch (error) {
        setIsLoadingRiders(false);
        setRiders([]);
      }
    };

    const handleConfirmRequest = async () => {
      if (rider.riderId != '0' && rider.totalAmount != '0') {
        try {
          setIsLoading(true);
          const res = await deliveryService.confirmPickupRequest({
            ...rider,
            paymentChannel,
            pickupRequestId: parsedPickupInfo.pickupRequestId.toString(),
          });
          if (res?.success) {
            setIsLoading(false);
            storage.set('_pickupInfo', JSON.stringify(res.data));
            navigate('request_preview');
          }
        } catch (error) {
          setIsLoading(false);
          RenderSnackbar({
            text: `We couldn't process your request, Please try again`,
          });
        }
      } else {
        RenderSnackbar({text: 'Select a Rider Please'});
      }
    };

    useEffect(() => {
      loadRiders();
    }, []);

    const RiderItem = ({
      item,
      selected,
    }: {
      item: RiderCloseBy;
      selected: boolean;
    }) => {
      const riderInfo = item.user;
      const [duration, setDuration] = useState('');

      const getTimeAway = async () => {
        const {duration} = await deliveryService.calcDistanceMatrix({
          x: item.location,
          y: parsedPickupInfo.pickupLocation,
        });
        setDuration(duration.text);
      };

      useEffect(() => {
        getTimeAway();
      }, []);

      return (
        <Pressable
          onPress={() => {
            setRider({
              totalAmount: item.company.totalPrice,
              riderId: item.riderId,
            });
          }}
          borderWidth={selected ? 1 : 0}
          borderBottomWidth={1}
          rounded={selected ? 'xs' : 'none'}
          flexDir="row"
          alignItems="center"
          px={selected ? '5px' : 0}
          justifyContent="space-between"
          borderBottomColor={selected ? 'none' : 'grey.500'}
          borderColor="main"
          h={hp(8)}>
          {/* @ts-ignore TODO delivery count */}
          <RidermanAvatar image={{uri: riderInfo.image}} deliveryCount={300} />
          <View w="60%" h="full">
            <HStack
              mt="2%"
              alignItems="center"
              justifyContent="flex-start"
              space="2">
              <Text fontWeight="600" fontSize={hp(1.4)}>
                {`${riderInfo.firstName} ${riderInfo.lastName}`}
              </Text>
              <Rating number={item.rating} />
            </HStack>
            <Pressable
              onPress={() => handleCompanyInfo('adeniyi')}
              bg="lightAccent"
              rounded="sm"
              mt="5px"
              w="80%"
              px="5px"
              h="25px"
              justifyContent="center">
              <Text
                textAlign="center"
                fontSize={hp(1.5)}
                isTruncated
                color="main">
                {item.company.name}
              </Text>
            </Pressable>
          </View>
          <View
            h="70%"
            w="20%"
            alignItems={'flex-end'}
            justifyContent="space-between">
            <Text textAlign="center" fontSize={hp(1.2)} color="main">
              {duration} away
            </Text>
            <MoneyText moneyValue={item.company.totalPrice} />
          </View>
        </Pressable>
      );
    };

    const renderItem = useCallback(
      ({item, index}: {item: RiderCloseBy; index: number}) => {
        return (
          <RiderItem {...{item}} selected={item.riderId === rider.riderId} />
        );
      },
      [rider],
    );

    return (
      <BottomSheetWrapperSnappy
        dragClose={false}
        index={0}
        ref={ref}
        snapPoints={snapPoints}>
        <View mb="10px" px="20px">
          <Text
            textAlign="center"
            fontWeight="medium"
            textTransform="uppercase">
            Select a Riderman
          </Text>
          <Text fontSize={hp(1)} w="60%" textAlign="center" alignSelf="center">
            Click on company’s name to preview T&Cs. Swipe up for more dispatch
            options!
          </Text>
        </View>
        <View
          borderWidth={0.5}
          borderColor="grey.500"
          mx="5%"
          mt="2px"
          mb="10px"
        />
        <View w="full" h="65%">
          <BottomSheetFlatList
            contentContainerStyle={{paddingHorizontal: 10}}
            data={riders}
            renderItem={renderItem}
            keyExtractor={(i, j) => j.toString()}
            onRefresh={loadRiders}
            refreshing={isLoadingRiders}
          />
        </View>
        <View bg="kindaWhite" w="full" px="10px">
          <SelectPaymentMethod
            method={paymentChannel}
            onChange={setPaymentChannel}
          />
          <Pressable
            onPress={handleConfirmRequest}
            px="10px"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt="2%"
            bg="main"
            disabled={isLoading}
            h="50px"
            rounded="lg">
            <Text color="white" fontWeight="600" fontSize={hp(1.5)}>
              {isLoading ? 'Loading ....' : 'Confirm'}
            </Text>
            <HStack alignItems="center" space="2">
              <MoneyText
                color="white"
                fontSize={hp(1.5)}
                moneyValue={rider.totalAmount}
              />
              <ChevronRightIcon color="white" />
            </HStack>
          </Pressable>
        </View>
      </BottomSheetWrapperSnappy>
    );
  },
);

export default SelectRiderModal;
