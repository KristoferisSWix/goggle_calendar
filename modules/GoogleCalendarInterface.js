import DateProvider from "./dateProvider.js";
import SidebarCalendar from "./SidebarCalendar.js";
import MainCalendar from "./MainCalendar.js";
import EventCreationModal from "./EventCreationModal.js";

export default class GoogleCalendarInterface {
  constructor() {
    this.date = new DateProvider();
    this.periodOffset = 0;

    this.initialize();
  }

  // execs
  initialize() {
    this.sidebarCalendar = new SidebarCalendar(this.date);
    this.modalControls = new EventCreationModal();

    this.renderCalendar();
    this.bindHeaderControls();
  }

  // displayers
  renderCalendar() {
    this.renderMainCalendar();
    this.displayHeaderDate();
  }
  displayHeaderDate() {
    const headerDateDisplay = document.querySelector("#header-date");
    headerDateDisplay.innerText = `${this.date.getMonthName(
      this.mainCalendar.weekInfo[0].month
    )} ${this.mainCalendar.weekInfo[0].year}`;
  }
  renderMainCalendar() {
    this.mainCalendar = new MainCalendar(
      this.date.getOffsetGMT(),
      this.date.getFullWeekInformation(this.periodOffset)
    );
  }

  // misc
  bindHeaderControls() {
    const nextPeriodBtn = document.querySelector("#next-period-btn");
    const prevPeriodBtn = document.querySelector("#prev-period-btn");
    const todayBtn = document.querySelector("#show-today-btn");
    const createEventBtn = document.querySelector("#create-event-btn");

    nextPeriodBtn.addEventListener("click", () => {
      this.periodOffset++;

      this.renderCalendar();
    });
    prevPeriodBtn.addEventListener("click", () => {
      this.periodOffset--;

      this.renderCalendar();
    });
    todayBtn.addEventListener("click", () => {
      this.periodOffset = 0;

      this.renderCalendar();
    });
    createEventBtn.addEventListener("click", () => {
      this.modalControls.initialize();

      const formContainer = document.querySelector("#modal-form");
      formContainer.addEventListener("submit", (e) => {
        e.preventDefault();

        if (this.modalControls.isComplete) this.renderCalendar();
      });
    });
  }
}
