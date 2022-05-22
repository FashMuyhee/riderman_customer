import React, {useCallback, useMemo, useState} from 'react';
import {ChevronRightIcon, HStack, Pressable, Text, View} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import rider from '@images/rider.png';
import {Image} from 'react-native';
import StarIcon from '@components/icons/star';
import {MoneyText} from '@components';
import SelectPaymentMethod from './SelectPaymentMethod';
import {PaymentMethod} from '@models/delivery';

export interface SelectRiderProps {
  handleCompanyInfo: (companyId: string) => void;
}

const SelectRiderModal = React.forwardRef<BottomSheet, SelectRiderProps>(({handleCompanyInfo}, ref) => {
  const snapPoints = useMemo(() => ['60%', '80%'], []);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');

  const RiderItem = () => {
    return (
      <Pressable borderBottomWidth={1} flexDir="row" alignItems="center" justifyContent="space-between" borderBottomColor="grey.500" h={hp(8)}>
        <View w="50px" h="50px">
          <Image source={rider} style={{width: 50, height: 50, alignSelf: 'center', borderRadius: 40}} />
          <View bg="linear-gradient(180deg, rgba(23, 143, 79, 0.7) 0%, rgba(16, 97, 54, 0.7) 100%)" w="50px" position="absolute" bottom="0px" borderRadius="sm">
            <Text fontSize="12px" opacity="1" textAlign="center" color="white">
              300
            </Text>
          </View>
        </View>
        <View w="60%" h="full">
          <HStack mt="2%" alignItems="center" justifyContent="flex-start" space="2">
            <Text fontWeight="600" fontSize={hp(1.4)}>
              Bolaji Adeniran
            </Text>
            <HStack space="1" alignItems="center" justifyContent="space-between">
              <StarIcon />
              <Text fontSize={hp(1.4)}>4.3</Text>
            </HStack>
          </HStack>
          <Pressable onPress={() => handleCompanyInfo('adeniyi')} bg="lightAccent" rounded="sm" mt="5px" w="80%" px="5px" h="25px" justifyContent="center">
            <Text textAlign="center" fontSize={hp(1.5)} isTruncated color="main">
              King Solomon Deliveries
            </Text>
          </Pressable>
        </View>
        <View h="70%" w="20%" alignItems={'flex-end'} justifyContent="space-between">
          <Text textAlign="center" fontSize={hp(1.2)} color="main">
            5 mins away
          </Text>
          <MoneyText moneyValue={12200} />
        </View>
      </Pressable>
    );
  };

  const renderItem = useCallback(() => {
    return <RiderItem />;
  }, []);

  return (
    <BottomSheetWrapperSnappy dragClose={false} index={0} ref={ref} snapPoints={snapPoints}>
      <View mb="10px" px="20px">
        <Text textAlign="center" fontWeight="medium" textTransform="uppercase">
          Select a Riderman
        </Text>
        <Text fontSize={hp(1)} w="60%" textAlign="center" alignSelf="center">
          Click on company’s name to preview T&Cs. Swipe up for more dispatch options!
        </Text>
      </View>
      <View borderWidth={0.5} borderColor="grey.500" mx="5%" mt="2px" mb="10px" />
      <View w="full" h="65%">
        <BottomSheetFlatList contentContainerStyle={{paddingHorizontal: 10}} data={Array(10).fill(1)} renderItem={renderItem} keyExtractor={(i, j) => j.toString()} />
      </View>
      <View bg="kindaWhite" h={hp(20)} w="full" px="10px">
        <SelectPaymentMethod method={paymentMethod} onChange={setPaymentMethod} />
        <Pressable px="10px" flexDir="row" alignItems="center" justifyContent="space-between" mt="2%" bg="main" h="50px" rounded="lg">
          <Text color="white" fontWeight="600" fontSize={hp(1.5)}>
            Confirm
          </Text>
          <HStack alignItems="center" space="2">
            <MoneyText color="white" fontSize={hp(1.5)} moneyValue={6000} />
            <ChevronRightIcon color="white" />
          </HStack>
        </Pressable>
      </View>
    </BottomSheetWrapperSnappy>
  );
});

export default SelectRiderModal;
