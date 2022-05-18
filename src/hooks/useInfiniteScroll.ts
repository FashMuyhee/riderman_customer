import {useState, useEffect} from 'react';

function useInfiniteScroll<T>(data: Array<T> | undefined, page: number = 1) {
  const [slicedData, setSlicedData] = useState<Array<T> | undefined>([]);

  const PAGE_NUMBER = 10 * page;

  const sliceItemsArray = () => {
    const sliced = data?.slice(0, PAGE_NUMBER).map(item => {
      return item;
    });
    setSlicedData(sliced);
  };

  useEffect(() => {
    sliceItemsArray();
  }, [page,data]);

  return {
    result: slicedData,
    fetchMore: sliceItemsArray,
    initialDataLength: data?.length,
  };
}

export default useInfiniteScroll;
