import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetTransactionHistoryQuery} from '@services/rtk-queries/wallet';
import {ScreenWrapper} from '@components';
import TransactionItem from './components/TransactionItem';
import {DeliverySkeleton} from '@screens/delivery-history/components/DeliveryItem';

const Transactions = () => {
  const [page, setPage] = useState(1);
  const {refetch, isFetching, isLoading, data} =
    useGetTransactionHistoryQuery(page);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ScreenWrapper pad>
      {isLoading || isFetching ? (
        <DeliverySkeleton />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => <TransactionItem item={item} />}
          onEndReached={() => {
            setPage(prev => +1);
          }}
        />
      )}
    </ScreenWrapper>
  );
};

export default Transactions;
