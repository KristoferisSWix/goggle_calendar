import { WEEK_LENGTH } from '../constants';

export default function getFullYear(monthOffset = 0, weekOffset = 0) {
  const date = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth() + monthOffset,
    date.getDate() + weekOffset * WEEK_LENGTH
  ).getFullYear();
}
