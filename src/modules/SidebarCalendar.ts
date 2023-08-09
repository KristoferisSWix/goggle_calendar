// @ts-ignore
import { FullMonthNames } from '../types.js';
import DateProvider from './dateProvider.js';

export default class SidebarCalendar {
  date: DateProvider;
  monthOffset;

  constructor(date: DateProvider) {
    this.date = date || new DateProvider();
    this.monthOffset = 0;

    this.initialize();
  }

  // execs
  initialize() {
    this.render();
    this.bindSidebarCalendarControls();
  }
  render() {
    this.displayHeading();
    this.displayBody();
  }

  // displayers
  displayHeading() {
    const sidebarCalendarHeading = document.querySelector(
      '#sidebar-calendar-date'
    ) as HTMLElement;
    const { year, month } = this.date.parseDateFromMonthOffset(
      this.monthOffset
    );
    const monthName = this.date.getMonthName(month);
    const fullMonthName =
      FullMonthNames[monthName as keyof typeof FullMonthNames];

    sidebarCalendarHeading.innerText = `${fullMonthName} ${year}`;
  }
  displayBody() {
    const sidebarCalendarBody = document.querySelector(
      '#sidebar-calendar'
    ) as HTMLElement;
    const currentMonthLength = this.date.getMonthLength(this.monthOffset);
    const prevMonthLength = this.date.getMonthLength(this.monthOffset - 1);

    const { year: displayYear, month: displayMonth } =
      this.date.parseDateFromMonthOffset(this.monthOffset);
    const firstWeekLength =
      7 - this.date.getWeekDay(1, displayMonth, displayYear);

    sidebarCalendarBody.innerHTML = '';

    const monthCells = [];
    for (let k = 1; k <= currentMonthLength; k++) {
      monthCells.push(this.createCell(k));
    }

    const firstRow = this.createRowSideCalendar(
      monthCells.splice(0, firstWeekLength),
      true,
      prevMonthLength,
      displayMonth,
      displayYear
    );
    sidebarCalendarBody.append(firstRow);

    while (monthCells.length) {
      const row = this.createRowSideCalendar(monthCells.splice(0, 7));
      sidebarCalendarBody.append(row);
    }
  }

  // creators
  createRowSideCalendar(
    rowElements: HTMLElement[],
    isFirstRow = false,
    prevMonthLength?: number,
    displayMonth?: number,
    displayYear?: number
  ) {
    const tRow = document.createElement('tr');

    if (isFirstRow && prevMonthLength) {
      const prevMonthFirstDisplayDate =
        prevMonthLength -
        this.date.getWeekDay(1, displayMonth, displayYear) +
        1;

      for (let j = prevMonthFirstDisplayDate; j <= prevMonthLength; j++) {
        tRow.append(this.createCell(j, true));
      }
    }

    tRow.append(...rowElements);

    if (!isFirstRow && rowElements.length < 7) {
      for (let i = 1; i <= 7 - rowElements.length; i++) {
        tRow.append(this.createCell(i, true));
      }
    }
    return tRow;
  }
  createCell(dayNumber: number, notCurrMonth = false) {
    const cell = document.createElement('td');

    if (notCurrMonth) {
      cell.className = 'sidebar-calendar-td sidebar-calendar-td-not-current';
    }
    if (!notCurrMonth) {
      cell.className =
        this.date.currentDay === dayNumber && !this.monthOffset
          ? 'sidebar-calendar-td sidebar-calendar-td-active'
          : 'sidebar-calendar-td';
    }

    cell.innerText = `${dayNumber}`;

    return cell;
  }

  // misc
  bindSidebarCalendarControls() {
    const nextPeriodBtn = document.querySelector(
      '#sidebar-calendar-next-period'
    ) as HTMLElement;
    const prevPeriodBtn = document.querySelector(
      '#sidebar-calendar-previous-period'
    ) as HTMLElement;

    nextPeriodBtn.addEventListener('click', () => {
      this.monthOffset++;
      this.render();
    });
    prevPeriodBtn.addEventListener('click', () => {
      this.monthOffset--;
      this.render();
    });
  }
}
