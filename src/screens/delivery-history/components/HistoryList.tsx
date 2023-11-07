import {FlatList, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {DateListTitle, ScreenWrapper} from '@components';
import {IDeliveryItem} from '@models/delivery';
import {useGetDeliveriesByStatusQuery} from '@services/rtk-queries/deliveries';
import DeliveryItem, {DeliverySkeleton} from './DeliveryItem';
import {formatDeliveriesByDate} from '@utils/helper';
import {SheetManager} from 'react-native-actions-sheet';
import {useRoute} from '@react-navigation/native';

const HistoryList = () => {
  const {params} = useRoute();
  //@ts-ignore
  const {status} = params;

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
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          renderItem={({item, index}) => (
            <View>
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
          onEndReachedThreshold={0.3}
          //TODO: EMPTY STATE
        />
      )}
    </ScreenWrapper>
  );
};

export default HistoryList;
