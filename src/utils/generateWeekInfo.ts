import { DAY_NAMES, WEEK_LENGTH } from '../constants';
import { DayParams } from '../types';

export default function generateWeekInfo(
  viewingDate: Date,
  targetedMonth = new Date().getMonth()
) {
  const date = new Date();

  const weekInfo: DayParams[] = [];
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

    weekInfo.push({
      year: saveDate.getFullYear(),
      month: saveDate.getMonth(),
      day: saveDate.getDate(),
      weekDayName: DAY_NAMES[saveDate.getDay()],
      isCurrentDay: isTodayCheck,
      isCurrentMonth: isCurrentMonthCheck,
    });
  }
  return weekInfo;
}
