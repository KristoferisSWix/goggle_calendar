import { WEEK_LENGTH } from '../constants';
import generateFullWeekInformation from './generateWeekInfo';

export default function getWeekInfo(weekOffset = 0) {
  const date = new Date();

  const viewingDay = date.getDate() + weekOffset * WEEK_LENGTH;
  const viewingDate = new Date(date.getFullYear(), date.getMonth(), viewingDay);
  return generateFullWeekInformation(viewingDate);
}
