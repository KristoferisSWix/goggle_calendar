import DateProvider from "./dateProvider.js";

export default class SidebarCalendar {
  constructor(date) {
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
      "#sidebar-calendar-date"
    );
    const { year, month } = this.date.parseDateFromMonthOffset(
      this.monthOffset
    );

    sidebarCalendarHeading.innerText = `${this.date.getMonthName(
      month
    )} ${year}`;
  }
  displayBody() {
    const sidebarCalendarBody = document.querySelector("#sidebar-calendar");
    const { currentMonthLength, prevMonthLength } =
      this.date.getPrevAndCurrMonthLength(this.monthOffset);

    const { month: displayMonthNumber } = this.date.parseDateFromMonthOffset(
      this.monthOffset
    );
    const firstWeekLength = 7 - this.date.getWeekDay(1, displayMonthNumber);

    sidebarCalendarBody.innerHTML = "";

    const monthCells = [];
    for (let k = 1; k <= currentMonthLength; k++) {
      monthCells.push(this.createCell(k));
    }

    const firstRow = this.createRowSideCalendar(
      monthCells.splice(0, firstWeekLength),
      true,
      prevMonthLength,
      displayMonthNumber
    );
    sidebarCalendarBody.append(firstRow);

    while (monthCells.length) {
      const row = this.createRowSideCalendar(monthCells.splice(0, 7));
      sidebarCalendarBody.append(row);
    }
  }

  // creators
  createRowSideCalendar(
    rowElements,
    isFirstRow = false,
    prevMonthLength,
    displayMonthNumber
  ) {
    const tRow = document.createElement("tr");

    if (isFirstRow) {
      const prevMonthFirstDisplayDate =
        prevMonthLength - this.date.getWeekDay(1, displayMonthNumber) + 1;

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
  createCell(text, notCurrMonth = false) {
    const cell = document.createElement("td");

    if (notCurrMonth) {
      cell.className = "sidebar-calendar-td sidebar-calendar-td-not-current";
    }
    if (!notCurrMonth) {
      cell.className =
        this.date.currentDay === text && !this.monthOffset
          ? "sidebar-calendar-td sidebar-calendar-td-active"
          : "sidebar-calendar-td";
    }

    cell.innerText = text;

    return cell;
  }

  // misc
  bindSidebarCalendarControls() {
    const nextPeriodBtn = document.querySelector(
      "#sidebar-calendar-next-period"
    );
    const prevPeriodBtn = document.querySelector(
      "#sidebar-calendar-previous-period"
    );

    nextPeriodBtn.addEventListener("click", () => {
      this.monthOffset++;
      this.render();
    });
    prevPeriodBtn.addEventListener("click", () => {
      this.monthOffset--;
      this.render();
    });
  }
}
