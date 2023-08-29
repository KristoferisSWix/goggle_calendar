import { WEEK_LENGTH } from '../constants';
import { DayParams } from '../types';
import generateFullWeekInformation from './generateWeekInfo';

export default function getMonthInfo(monthOffset = 0, weekOffset = 0) {
  const date = new Date();

  const returnArr: DayParams[] = [];
  const initialDate = new Date(
    date.getFullYear(),
    date.getMonth() + monthOffset,
    date.getDate() + weekOffset * WEEK_LENGTH
  );
  const targetMonth = initialDate.getMonth();

  for (let i = 0; i < 6; i++) {
    const viewingDate = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      1 + WEEK_LENGTH * i
    );
    returnArr.push(...generateFullWeekInformation(viewingDate, targetMonth));
  }
  return returnArr;
}
