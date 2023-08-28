import { WEEK_LENGTH } from '../constants';
import { FullMonthNames } from '../types';

const date = new Date();

export default function getMonthName(
  monthOffset = 0,
  weekOffset = 0,
  month = date.getMonth()
) {
  if (monthOffset !== 0 && weekOffset === 0) {
    month = new Date(
      date.getFullYear(),
      date.getMonth() + monthOffset
    ).getMonth();
  } else if (weekOffset !== 0 && monthOffset === 0) {
    month = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + weekOffset * WEEK_LENGTH
    ).getMonth();
  } else if (weekOffset && monthOffset) {
    month = new Date(
      date.getFullYear(),
      date.getMonth() + monthOffset,
      date.getDate() + weekOffset * WEEK_LENGTH
    ).getMonth();
  }
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthNames[month] as keyof typeof FullMonthNames;
}
