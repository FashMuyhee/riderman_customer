import {MoneyText, ScreenWrapper, Button} from '@components';
import {GuardStackParamList} from '@navigations/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, Image, Center, ScrollView, Box, HStack, useDisclose} from 'native-base';
import React, {useEffect, useState} from 'react';
import riderman from '@images/illustrations/riderman.png';
import {hp} from '@utils/responsive';
import logo from '@images/company-logo.png';
import rider from '@images/rider.png';
import TimeSolid from '@components/icons/time-solid';
import {PaymentMethodIcon} from './components/SelectPaymentMethod';
import RiderBrief from './components/RiderBrief';
import RequestLocations from './components/RequestLocations';
import {PackageNote, PackageType} from './components/SummaryItem';
import UserIcon from '@components/icons/user';
import PhoneIcon from '@components/icons/phone';
import CallIcon from '@components/icons/call';
import RequestProgressSheet, {RequestProgressStatus} from './components/RequestProgressSheet';
import CancelRequestSheet from './components/CancelRequestSheet';

interface RequestPreview {
  navigation: StackNavigationProp<GuardStackParamList, 'request_preview'>;
}

type PackageBriefProps = {
  contactName: string;
  contactPhone: string;
  packageType: string[];
  index: number;
};
export const PackageBrief = ({contactName, contactPhone, packageType, index}: PackageBriefProps) => {
  return (
    <View px="15px" mt="4%">
      <HStack alignItems="center" space="2">
        <Text bold>D{index}</Text>
        {packageType?.map((item, key) => (
          <PackageType type={item} key={key} />
        ))}
      </HStack>
      <HStack mt="3%" alignItems="center" justifyContent="space-between">
        <HStack alignItems="center"  w="48%" space="4">
          <UserIcon />
          <Text>{contactName}</Text>
        </HStack>
        <HStack alignItems="center" w="48%" space="5">
          <PhoneIcon />
          <Text>{contactPhone}</Text>
        </HStack>
      </HStack>
      <PackageNote rounded note="No break am " />
    </View>
  );
};
const RequestPreview = ({navigation}: RequestPreview) => {
  const packageBrief = [
    {
      contactPhone: '0801 234 5678',
      contactName: 'Jonathan Jude',
      packageType: ['Cloth', 'Food'],
    },
    {
      contactPhone: '0801 234 5678',
      contactName: 'Nancy Wheeler',
      packageType: ['Bag', 'Shoe'],
    },
  ];

  const {isOpen: visibleCancel, onToggle: toggleCancel} = useDisclose();
  const {isOpen: visibleProgress, onToggle: toggleProgress} = useDisclose();
  const [progressStatus, setProgressStatus] = useState<RequestProgressStatus>('progress');

  const handleCloseCancelModal = () => {
    toggleCancel();
    toggleProgress();
  };

  useEffect(() => {
    //simulate progress sheet opening
    setTimeout(() => {
      toggleProgress();
    }, 3000);
  }, []);

  return (
    <ScreenWrapper barColor="white" barStyle="dark-content">
      <ScrollView>
        <Center marginTop={hp(10)}>
          <Image source={riderman} alt="riderman" />
          <Text w="60%" fontSize={hp(1.5)} mt="5%" textAlign="center">
            Request has been sent to rider successfully!
          </Text>
        </Center>
        <Box mt="4%">
          {/* comoany info */}
          <HStack borderTopRadius="2xl" bg="accent" h="80px" alignItems="center" justifyContent="space-between" px="10px">
            <Image source={logo} alt="company logo" rounded="full" bg="gray.400" size="50px" />
            <View w="60%">
              <Text fontSize={hp(1.3)} fontWeight="600">
                Rush Delivery Limited
              </Text>
              <HStack mt="10px" alignItems="center" space="2">
                <TimeSolid />
                <Text fontSize="12px">3 min away</Text>
              </HStack>
            </View>
            <View justifyContent="center" alignItems="center" w="20%">
              <HStack alignItems="center" space="1">
                <PaymentMethodIcon method="Cash" selected={false} />
                <Text>Cash</Text>
              </HStack>
              <MoneyText bold moneyValue={6000} />
            </View>
          </HStack>
          {/* rider info */}
          <RiderBrief image={rider} fullname="Adeola Adebimpe" plateNo="GTY67809" rating={3} />
          <RequestLocations pickUp="26, Obafemi Awolowo Road" deliveryLocations={['Murtala Mohammed Internationational Airport Lagos', 'Bayeku Igbogbo Ikorodu, Ikorodu, Lagos']} />
          <View borderWidth={1} mx="10px" mt="20px" borderColor="gray.200" borderStyle="dashed" />
          {packageBrief.map((item, key) => (
            <PackageBrief key={key} {...item} index={key + 1} />
          ))}
          <View borderWidth={1} mx="10px" mt="10px" borderColor="gray.200" borderStyle="dashed" />
        </Box>
        <HStack alignItems="center" justifyContent="space-between" mb={hp(5)} mt="5%" px="10px">
          <Button bg="black" title="Go To Home" w="48%" onPress={() => navigation.navigate('home')} />
          <Button title="Call Rider" w="48%" leftIcon={<CallIcon />} onPress={toggleProgress} />
        </HStack>
      </ScrollView>
      <RequestProgressSheet onKeepWaiting={() => setProgressStatus('progress')} progressStatus={progressStatus} visible={visibleProgress} onClose={toggleProgress} onCancel={toggleCancel} />
      <CancelRequestSheet visible={visibleCancel} onCancel={toggleCancel} onClose={handleCloseCancelModal} />
    </ScreenWrapper>
  );
};

export default RequestPreview;
