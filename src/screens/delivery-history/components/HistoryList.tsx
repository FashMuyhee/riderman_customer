import {Pressable} from 'native-base';
import React from 'react';
import {DateListTitle, ScreenWrapper} from '@components';
import RequestLocations from '../../request-delivery/components/RequestLocations';
import DeliveryDetailSheet from './DeliveryDetailSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {DeliveryStatus} from '@models/delivery';

type Props = {
  status: DeliveryStatus;
};

const HistoryList = ({status}: Props) => {
  const deliveryDetailSheet = React.useRef<BottomSheet>(null);

  return (
    <ScreenWrapper pad>
      <DateListTitle date="2022-08-01" />
      <Pressable onPress={() => deliveryDetailSheet.current?.snapToIndex(0)} bg="white" borderWidth={1} borderColor="grey.500" py="15px" rounded="lg" px="10px">
        <RequestLocations mt="0%" deliveryLocations={['26, Obafemi Awolowo Road', 'Bayeku Igbogbo, Ikorodu, Lagos']} pickUp="Mushilab Nigeria Limited, Abeokuta" />
      </Pressable>
      <DeliveryDetailSheet deliveryStatus={status} ref={deliveryDetailSheet} onClose={() => deliveryDetailSheet.current?.close()} />
    </ScreenWrapper>
  );
};

export default HistoryList;
