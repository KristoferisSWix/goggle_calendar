import { WEEK_LENGTH } from '../constants';
import { FullMonthNames } from '../types';

export default function getMonthName(
  monthOffset = 0,
  weekOffset = 0,
  month = new Date().getMonth()
) {
  const date = new Date();

  month = new Date(
    date.getFullYear(),
    date.getMonth() + monthOffset,
    date.getDate() + weekOffset * WEEK_LENGTH
  ).getMonth();
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
