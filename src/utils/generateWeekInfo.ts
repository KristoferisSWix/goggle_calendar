import { DAY_NAMES, WEEK_LENGTH } from '../constants';
import { dayParams } from '../types';

const date = new Date();

export default function generateFullWeekInformation(
  viewingDate: Date,
  targetedMonth = date.getMonth()
) {
  const returnArr: dayParams[] = [];
  const firstDayOfWeek = viewingDate.getDate() - viewingDate.getDay();

  for (let i = 0; i < WEEK_LENGTH; i++) {
    const dateDay = firstDayOfWeek + i;
    const saveDate = new Date(
      viewingDate.getFullYear(),
      viewingDate.getMonth(),
      dateDay
    );
    const isTodayCheck =
      date.getDate() === saveDate.getDate() &&
      date.getMonth() === saveDate.getMonth() &&
      date.getFullYear() === saveDate.getFullYear();
    const isCurrentMonthCheck = targetedMonth === saveDate.getMonth();

    returnArr.push({
      year: saveDate.getFullYear(),
      month: saveDate.getMonth(),
      day: saveDate.getDate(),
      weekDayName: DAY_NAMES[saveDate.getDay()],
      isCurrentDay: isTodayCheck,
      isCurrentMonth: isCurrentMonthCheck,
    });
  }
  return returnArr;
}
