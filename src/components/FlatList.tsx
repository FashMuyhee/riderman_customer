import React, {useCallback, useState} from 'react';
import {FlatList as NBFlatList, IBoxProps} from 'native-base';
import {FlatListProps as RNFlatListProps} from 'react-native';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

interface FlatListProps extends RNFlatListProps<any>, IBoxProps {
  boxProps?: IBoxProps;
}

const FlatList: React.FunctionComponent<FlatListProps> = ({
  data,
  renderItem,
  ListEmptyComponent,
  initialNumToRender,
  ...boxProps
}) => {
  const keyExtractor = useCallback((item, key: number) => {
    return key.toString();
  }, []);

  const [page, setPage] = useState(1);
  const {result, fetchMore, initialDataLength} = useInfiniteScroll(data, page);

  const loadMoreData = () => {
    setPage(prev => prev + 1);
    fetchMore();
  };

  return (
    // @ts-expect-error
    <NBFlatList
      {...boxProps}
      data={result}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={
        // @ts-ignore
        initialDataLength > result?.length ? loadMoreData : () => false
      }
      onEndReachedThreshold={0.5}
      initialNumToRender={initialNumToRender ? initialNumToRender : 10}
    />
  );
};

export default FlatList;
