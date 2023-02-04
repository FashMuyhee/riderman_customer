import React, {useEffect, useState} from 'react';
import {HStack, Badge, View, Text} from 'native-base';
import ArrowGradient from '@components/icons/arrow-gradient';
import NotesIcon from '@components/icons/notes';
import {hp} from '@utils/responsive';
import {IDeliveryRequestBody} from '@models/delivery';
import deliveryService from '@services/Delivery';

export type ISummaryItemProps = {
  isLast: boolean;
  request: IDeliveryRequestBody;
};

export const PackageNote = ({note, rounded = false, bRadius = false}: {note: string; rounded?: boolean; bRadius?: boolean}) => (
  <HStack px="5%" alignItems="center" bg="lightAccent" h="30px" mt="5px" borderRadius={rounded ? 'md' : undefined} borderBottomRadius={bRadius ? 'xl' : undefined}>
    <NotesIcon />
    <Text ml="10px" color="main" fontSize="11px">
      {note}
    </Text>
  </HStack>
);

export const PackageType = ({type}: {type: string}) => (
  <Badge bg="main" px="15px" rounded="5px" _text={{color: 'white', textAlign: 'center', textTransform: 'capitalize'}}>
    {type}
  </Badge>
);

const SummaryItem: React.FC<ISummaryItemProps> = ({isLast, request}) => {
  const [distance, setDistance] = useState(0);

  const calcDistance = async () => {
    const {distance} = await deliveryService.calcDistanceMatrix({x: request.pickupLocation, y: request.deliveryLocation});
    const distanceInKm = distance.value / 1000;
    setDistance(distanceInKm);
  };

  useEffect(() => {
    calcDistance();
  }, []);

  return (
    <View mb={isLast ? hp(22) : 0} rounded="xl" minH={hp(20)} mt="20px" w="full" bg="white">
      <HStack px="20px" mt="10px" alignItems="center" justifyContent="flex-start" space="2">
        {!!request.packageTypes && request.packageTypes.map((type, i) => <PackageType key={i} type={type} />)}
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
          <Text fontSize="10px">{request.packageNo} Packages</Text>
          <Text fontSize="11px">{request.pickupLocation.address}</Text>
        </View>
        <View w="40%">
          <Text fontSize="11px">{request.rName}</Text>
          <Text fontSize="11px">{request.deliveryLocation.address}</Text>
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
        <Text fontSize="11px">{request.rPhone}</Text>
        <Text fontSize="11px">{Math.round(distance)}km</Text>
      </HStack>
      <PackageNote bRadius note={request.instruction} />
    </View>
  );
};

const Memoized = React.memo(SummaryItem);
export default Memoized;
