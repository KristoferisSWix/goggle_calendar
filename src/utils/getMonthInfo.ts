import { WEEK_LENGTH } from '../constants';
import { dayParams } from '../types';
import generateFullWeekInformation from './generateWeekInfo';

const date = new Date();

export default function getMonthInfo(monthOffset = 0, weekOffset = 0) {
  const returnArr: dayParams[] = [];
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
