import { WEEK_LENGTH } from '../constants';

const date = new Date();

export default function getFullYear(monthOffset = 0, weekOffset = 0) {
  if (weekOffset && monthOffset) {
    return new Date(
      date.getFullYear(),
      date.getMonth() + monthOffset,
      date.getDate() + weekOffset * WEEK_LENGTH
    ).getFullYear();
  }
  if (monthOffset !== 0) {
    return new Date(
      date.getFullYear(),
      date.getMonth() + monthOffset
    ).getFullYear();
  }
  if (weekOffset !== 0) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + weekOffset * WEEK_LENGTH
    ).getFullYear();
  }
  return date.getFullYear();
}
