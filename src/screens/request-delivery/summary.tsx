import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, HStack} from 'native-base';
import {ScreenWrapper, Button, FlatList} from '@components';
import {hp} from '@utils/responsive';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SummaryItem from './components/SummaryItem';
dayjs.extend(advancedFormat);

export type IDeliverySummaryProps = {
  navigation: StackNavigationProp<GuardStackParamList, 'delivery_summary'>;
};

const DeliverySummary: React.FC<IDeliverySummaryProps> = ({navigation}) => {
  return (
    <ScreenWrapper pad={false} bgColor="#fafafa">
      <Text textAlign="center" mt="20px" color="grey.200" fontSize="13px">
        {dayjs().format('ddd, Do MMM, YYYY')}
      </Text>
      <FlatList px="20px" h="full" w="full" data={Array(3)} renderItem={({item, index}) => <SummaryItem isLast={index === 2} />} />

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
        <HStack h="30px" mt="5px" alignItems="center" justifyContent="space-between">
          <Text fontSize="11px">Total Distance</Text>
          <Text fontSize="14px" fontWeight="semibold">
            10.6km
          </Text>
        </HStack>
        <View mt="20px" borderColor="grey.500" borderStyle="dashed" borderWidth={1} borderRadius="1px" />
        <HStack space="3" alignItems="center" mt="20px">
          <Button bg="black" title="Cancel" w="1/2" />
          <Button title="Confirm" w="1/2" onPress={() => navigation.navigate('select_rider')} />
        </HStack>
      </View>
    </ScreenWrapper>
  );
};

export default DeliverySummary;
