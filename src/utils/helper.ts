import {IDeliveryItem, DeliveryStatus} from '@models/delivery';
import {formatDateToNative} from './date-format';

/**
 * check if a string variable is empty
 * @param str
 * @returns
 */
export const isEmptyString = (str?: string) => {
  if (str) {
    return false;
  }
  return true;
};

/**
 * format delivery items by date
 * @param  {IDeliveryItem[]} data
 * @param  {DeliveryStatus} status
 * @returns Record
 */
export function formatDeliveriesByDate(data: IDeliveryItem[], status: DeliveryStatus): Record<string, IDeliveryItem[]> {
  const record = data;
  const filter: any = {};

  if (!!record && record?.length > 0) {
    for (const item of record) {
      let deliveryDate;
      switch (status) {
        case 'active':
          deliveryDate = formatDateToNative(item.activeAt);
          break;
        case 'processing':
          deliveryDate = formatDateToNative(item.processingAt);
          break;
        case 'completed':
          deliveryDate = formatDateToNative(item.completedAt);
          break;
        case 'confirmed':
          deliveryDate = formatDateToNative(item.confirmedAt);
          break;
        default:
          deliveryDate = formatDateToNative(item.createdAt);
          break;
      }
      if (!filter[deliveryDate]) filter[deliveryDate] = [];
      filter[deliveryDate].push(item);
    }
    return filter;
  }
  return {};
}
