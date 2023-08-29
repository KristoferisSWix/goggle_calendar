import { WEEK_LENGTH } from '../constants';
import generateFullWeekInformation from './generateWeekInfo';

const date = new Date();

export default function getWeekInfo(weekOffset = 0) {
  const viewingDay = date.getDate() + weekOffset * WEEK_LENGTH;
  const viewingDate = new Date(date.getFullYear(), date.getMonth(), viewingDay);
  return generateFullWeekInformation(viewingDate);
}
