import { WEEK_LENGTH } from "../constants";
import { dayParams } from "../types";

export default class DateProvider {
  currentYear;
  currentMonth;
  currentDay;
  weekOffset;

  constructor(weekOffset: number) {
    this.weekOffset = weekOffset;
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentDay = new Date().getDate();
  }

  // week getters
  private getWeekDayName(weekDay: number) {
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    return dayNames[weekDay];
  }
  private generateFullWeekInformation(
    viewingDate: Date,
    targetedMonth = this.currentMonth
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
        this.currentDay === saveDate.getDate() &&
        this.currentMonth === saveDate.getMonth() &&
        this.currentYear === saveDate.getFullYear();
      const isCurrentMonthCheck = targetedMonth === saveDate.getMonth();

      returnArr.push({
        year: saveDate.getFullYear(),
        month: saveDate.getMonth(),
        day: saveDate.getDate(),
        weekDayName: this.getWeekDayName(saveDate.getDay()),
        isCurrentDay: isTodayCheck,
        isCurrentMonth: isCurrentMonthCheck,
      });
    }
    return returnArr;
  }
  private getViewingDateFromWeekOffset() {
    return new Date(
      this.currentYear,
      this.currentMonth,
      this.currentDay + this.weekOffset * WEEK_LENGTH
    );
  }
  getWeekInfo(
    viewingDay = this.currentDay,
    weekOffset = this.weekOffset
  ): dayParams[] {
    const correctedViewingDay = viewingDay + weekOffset * WEEK_LENGTH;
    const viewingDate = new Date(
      this.currentYear,
      this.currentMonth,
      correctedViewingDay
    );

    return this.generateFullWeekInformation(viewingDate);
  }

  // month getters
  getMonthInfo(monthOffset: number): dayParams[] {
    const returnArr: dayParams[] = [];
    const offsetViewingDate = this.getViewingDateFromWeekOffset();
    const correctedMonthOffset = monthOffset
      ? this.currentMonth + monthOffset
      : offsetViewingDate.getMonth();
    const targetMonth = new Date(
      offsetViewingDate.getFullYear(),
      correctedMonthOffset
    ).getMonth();

    for (let i = 0; i < 6; i++) {
      const viewingDate = new Date(
        offsetViewingDate.getFullYear(),
        correctedMonthOffset,
        1 + WEEK_LENGTH * i
      );
      returnArr.push(
        ...this.generateFullWeekInformation(viewingDate, targetMonth)
      );
    }
    return returnArr;
  }
  getMonthName(monthOffset?: number, month = this.currentMonth) {
    if (monthOffset && monthOffset !== 0) {
      const parsedDate = this.parseDateFromMonthOffset(monthOffset);
      month = parsedDate.month;
    } else {
      month = this.getViewingDateFromWeekOffset().getMonth();
    }
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[month];
  }
  // misc
  getOffsetGMT() {
    function isSingleDigit(n: number) {
      return `${n < 10 ? "0" : ""}${n}`;
    }
    let offset = new Date().getTimezoneOffset();
    const sign = offset < 0 ? "+" : "-";
    offset = Math.abs(offset);
    return sign + isSingleDigit(offset / 60 || 0);
  }
  parseDateFromMonthOffset(monthOffset: number) {
    let parsedDate: Date;
    if (monthOffset) {
      parsedDate = new Date(this.currentYear, this.currentMonth + monthOffset);
    } else {
      parsedDate = this.getViewingDateFromWeekOffset();
    }
    return {
      year: parsedDate.getFullYear(),
      month: parsedDate.getMonth(),
    };
  }
}
