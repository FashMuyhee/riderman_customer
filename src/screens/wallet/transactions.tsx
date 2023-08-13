import {FlatList, ListRenderItemInfo} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetTransactionHistoryQuery} from '@services/rtk-queries/wallet';
import {ScreenWrapper} from '@components';
import TransactionItem from './components/TransactionItem';
import {DeliverySkeleton} from '@screens/delivery-history/components/DeliveryItem';
import {TransactionItem as Transaction} from '@models/wallet';

const Transactions = () => {
  const [page, setPage] = useState(1);
  const {refetch, isFetching, isLoading, data} =
    useGetTransactionHistoryQuery(page);
    
  const renderTransactionItem = ({item}: ListRenderItemInfo<Transaction>) => {
    return <TransactionItem item={item} />;
  };

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
          renderItem={renderTransactionItem}
          onEndReached={() => {
            setPage(prev => +1);
          }}
        />
      )}
    </ScreenWrapper>
  );
};

export default Transactions;
