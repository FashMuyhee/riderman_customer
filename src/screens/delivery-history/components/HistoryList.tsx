import {FlatList, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DateListTitle, ScreenWrapper} from '@components';
import {DeliveryStatus, IDeliveryItem} from '@models/delivery';
import {useGetDeliveriesByStatusQuery} from '@services/rtk-queries/deliveries';
import DeliveryItem, {DeliverySkeleton} from './DeliveryItem';
import {formatDeliveriesByDate} from '@utils/helper';
import {SheetManager} from 'react-native-actions-sheet';

type Props = {
  status: DeliveryStatus;
};

const HistoryList = ({status}: Props) => {
  const [page, setPage] = useState(1);
  const {data, isLoading, isFetching, refetch} = useGetDeliveriesByStatusQuery({
    page,
    status,
  });

  const deliveries = formatDeliveriesByDate(data?.data as IDeliveryItem[], status);

  useEffect(() => {
    refetch();
  }, [status]);

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
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item, index}) => (
            <View key={index}>
              <DateListTitle date={item} />
              {deliveries[item].map((ele: IDeliveryItem, index: number) => {
                return (
                  <DeliveryItem
                    key={`deliveryItem_${ele.deliveryId}`}
                    item={ele}
                    onPress={d => {
                      SheetManager.show('delivery-history', {payload: {deliveryId: d.deliveryId, deliveryStatus: d.deliveryStatus}});
                    }}
                  />
                );
              })}
            </View>
          )}
          onEndReached={() => {
            setPage(prev => +1);
          }}
          //TODO: EMPTY STATE
        />
      )}
    </ScreenWrapper>
  );
};

export default HistoryList;
