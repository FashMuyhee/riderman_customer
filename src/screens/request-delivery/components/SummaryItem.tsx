import React from 'react';
import {HStack, Badge, View, Text} from 'native-base';
import ArrowGradient from '@components/icons/arrow-gradient';
import NotesIcon from '@components/icons/notes';
import {hp} from '@utils/responsive';

export type ISummaryItemProps = {
  isLast: boolean;
};

const SummaryItem: React.FC<ISummaryItemProps> = ({isLast}) => {
  return (
    <View mb={isLast ? hp(22) : 0} rounded="xl" h={hp(30)} mt="20px" w="full" bg="white">
      <HStack px="20px" mt="10px" alignItems="center" justifyContent="flex-start" space="2">
        <Badge bg="main" rounded="md" _text={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>
          Clothes
        </Badge>
        <Badge bg="main" rounded="md" _text={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>
          Clothes
        </Badge>
      </HStack>
      <View borderWidth={0.6} borderRadius="1px" borderStyle={'dashed'} borderColor="#eeeeee" mt="10px" mx="20px" />
      <HStack alignItems="center" mt="10px" px="20px" justifyContent="space-between">
        <Text fontWeight="700" fontSize="12px" color="main">
          PICK UP
        </Text>
        <ArrowGradient />
        <Text fontWeight="700" fontSize="12px" color="main">
          DROP OFF
        </Text>
      </HStack>
      <HStack alignItems="flex-start" mt="10px" px="20px" justifyContent="space-between">
        <View w="40%">
          <Text fontSize="10px">2 Packages</Text>
          <Text fontSize="11px">26, Obafemi Awolowo Road</Text>
        </View>
        <View w="40%">
          <Text fontSize="11px">Jonathan Jude</Text>
          <Text fontSize="11px">Murtala Mohammed Internationational Airport, Ikeja</Text>
        </View>
      </HStack>
      <View borderWidth={0.6} borderRadius="1px" borderStyle={'dashed'} borderColor="#eeeeee" mt="20px" mx="20px" />
      <HStack alignItems="flex-start" mt="10px" px="20px" justifyContent="space-between">
        <Text fontSize="11px" color="main">
          Phone
        </Text>
        <Text fontSize="11px" color="main">
          Distance
        </Text>
      </HStack>
      <HStack alignItems="flex-start" mt="5px" px="20px" justifyContent="space-between">
        <Text fontSize="11px">080 234 678 89</Text>
        <Text fontSize="11px">5.3km</Text>
      </HStack>
      <HStack px="5%" alignItems="center" bg="lightAccent" h="35px" mt="5px" borderBottomRadius="xl">
        <NotesIcon />
        <Text ml="10px" color="main" fontSize="11px">
          Items are delicate
        </Text>
      </HStack>
    </View>
  );
};

export default SummaryItem;
