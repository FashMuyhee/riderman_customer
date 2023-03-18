/**
 * * Function to handle product search by product name or category
//  *  for warehouse and inventory
 * @param  {} data data to search
 * @param  {} query query search keyword or query
 * @param  {} searchKeys the first index is the product name and the second is category
 * @param  {{data:Array<T>;query:string;searchKeys:string[];}}
 */
export function handleSearchList<T>({
  data,
  query,
  searchKeys,
}: {
  data: Array<T> | undefined;
  query: string;
  searchKeys: string[];
}) {
  const searchedProduct = data?.filter(
    el =>
      // @ts-ignore
      el[`${searchKeys[0]}`]?.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      el[`${searchKeys[1]}`]?.toLowerCase().includes(query.toLowerCase()) ||
      // @ts-ignore
      el[`${searchKeys[2]}`]?.toLowerCase().includes(query.toLowerCase()),
  );

  return searchedProduct;
}
