import {FlatList, View} from 'native-base';
import React, {useState} from 'react';
import {DateListTitle, ScreenWrapper} from '@components';
import DeliveryDetailSheet from './DeliveryDetailSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {DeliveryStatus, IDeliveryItem} from '@models/delivery';
import TipRiderSheet from './TipRiderSheet';
import {useGetDeliveriesByStatusQuery} from '@services/rtk-queries/deliveries';
import DeliveryItem, {DeliverySkeleton} from './DeliveryItem';
import {formatDeliveriesByDate} from '@utils/helper';

type Props = {
  status: DeliveryStatus;
};

const HistoryList = ({status}: Props) => {
  const deliveryDetailSheet = React.useRef<BottomSheet>(null);
  const tipSheet = React.useRef<BottomSheet>(null);
  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching} = useGetDeliveriesByStatusQuery({page, status});
  const [selectedItem, setSelectedItem] = useState<IDeliveryItem | null>(null);

  const deliveries = formatDeliveriesByDate(data?.data as IDeliveryItem[], status);

  return (
    <ScreenWrapper pad>
      {isLoading || isFetching ? (
        <View>
          <DeliverySkeleton />
          <DeliverySkeleton />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Object.keys(deliveries)}
          renderItem={({item, index}) => (
            <View key={index}>
              <DateListTitle date={item} />
              {deliveries[item].map((ele: IDeliveryItem, index: number) => {
                return (
                  <DeliveryItem
                    key={`deliveryItem_${ele.deliveryId}`}
                    item={ele}
                    onPress={d => {
                      setSelectedItem(d);
                      deliveryDetailSheet.current?.snapToIndex(0);
                    }}
                  />
                );
              })}
            </View>
          )}
          onEndReached={() => {
            setPage(prev => +1);
          }}
        />
      )}
      <DeliveryDetailSheet
        handleTipRider={() => {
          deliveryDetailSheet.current?.close();
        }}
        deliveryStatus={status}
        ref={deliveryDetailSheet}
        onClose={() => deliveryDetailSheet.current?.close()}
        item={selectedItem as IDeliveryItem}
      />
      <TipRiderSheet ref={tipSheet} onClose={() => tipSheet.current?.close()} />
    </ScreenWrapper>
  );
};

export default HistoryList;
