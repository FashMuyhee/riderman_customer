import React, { useMemo} from 'react';
import { HStack, Text, View, Image, Badge} from 'native-base';
import {BottomSheetWrapperSnappy} from '@components/BottomSheetWrapper';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {hp} from '@utils/responsive';
import companyLogo from '@images/company-logo.png';
import StarIcon from '@components/icons/star';
import {MoneyText} from '@components';

export interface CompanyInfoSheetProps {
  onClose: () => void;
}

const CompanyInfoSheet = React.forwardRef<BottomSheet, CompanyInfoSheetProps>(({onClose}, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <BottomSheetWrapperSnappy index={-1} ref={ref} snapPoints={snapPoints}>
      <View px="10px" w="full">
        <Text onPress={onClose} color="main">
          Go Back
        </Text>
        <Image mt="-10px" source={companyLogo} alt="logo" borderRadius="full" w="60px" h="60px" alignSelf="center" />
        <HStack w="35px" mt="2%" alignSelf="center" alignItems="center" justifyContent="space-between">
          <StarIcon />
          <Text fontSize={hp(1.4)}>4.3</Text>
        </HStack>
        <Text fontSize={hp(1.5)} textAlign="center" fontWeight="semibold" mt="2%">
          Rush Delivery Limited
        </Text>
        <Badge w="48%" rounded="sm" bg="#5DB184" mt="5px" alignSelf="center" justifyContent="center" _text={{color: 'white', textAlign: 'center'}}>
          310 Completed Deliveries
        </Badge>
      </View>
      <BottomSheetScrollView style={{paddingHorizontal: 10, marginTop: 10}}>
        <View mb="20px">
          <HStack borderBottomWidth={1} borderBottomColor="coolGray.200" pb="10px" mb="2%" alignItems="center" justifyContent="space-between">
            <Text fontSize={hp(1.5)}>Delivery fee</Text>
            <MoneyText moneyValue={2000} />
          </HStack>
          <HStack borderBottomWidth={1} borderBottomColor="coolGray.200" pb="10px" mb="2%" alignItems="center" justifyContent="space-between">
            <Text fontSize={hp(1.5)}>Delivery rate</Text>
            <Text fontSize={hp(1.5)}>₦50/KM</Text>
          </HStack>
          <HStack mb="2%" alignItems="center" justifyContent="space-between">
            <Text fontSize={hp(1.5)}>Wait time</Text>
            <Text fontSize={hp(1.5)}>5 MINS</Text>
          </HStack>
          <View borderWidth={1} borderStyle="dashed" borderColor={'coolGray.200'} />
        </View>
        <Text fontSize={hp(1.5)}>
          Doc. Wait a minute, Doc. What are you talking about? What happens to us in the future? What do we become assholes or something? You got a real attitude problem, McFly. You're a slacker. You
          remind me of you father when he went her, he was a slacker too. You wanna a Pepsi, pall, you're gonna pay for it. What did she say? It's your mom, she's tracked you down. Quick, let's cover
          the time machine. Okay. Re-elect Mayor Goldie Wilson. Progress is his middle name. But, what are you blind McFly, it's there. How else do you explain that wreck out there? Yeah, well history
          is gonna change. Never mind that, never mind that now, never mind that, never mind- I over slept, look I need your help. I have to ask Lorraine out but I don't know how to do it. I have to
          ask Lorraine out but I don't know how to do it. Well, it will just happen. Like the way I met your father. Um, yeah, I'm on my way. No. What?
        </Text>
      </BottomSheetScrollView>
    </BottomSheetWrapperSnappy>
  );
});

export default CompanyInfoSheet;
