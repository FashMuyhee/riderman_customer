import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export const formatDateWithoutYear = (date: string | Date): string => {
  const dateToFormat = dayjs(date);
  const todayYear = dayjs().year();
  if (todayYear > dateToFormat.year()) {
    return dateToFormat.format('ddd, Do MMM YY');
  }
  return dateToFormat.format('ddd, Do MMM');
};

export const formatDateToNative = (date: string | Date): string => {
  const dateToFormat = dayjs(date);

  return dateToFormat.format('YYYY-MM-DD');
};

export const formatDate = (date?: string): string => {
  const dateToFormat = dayjs(date);

  return dateToFormat.format('ddd, Do MMM YY');
};
