// @ts-ignore
import DateProvider from './dateProvider.js';
import SidebarCalendar from './SidebarCalendar.js';
import MainCalendar from './MainCalendar.js';
import EventCreationModal from './EventCreationModal.js';
import { FullMonthNames } from '../types.js';

export default class GoogleCalendarInterface {
  date;
  periodOffset;
  sidebarCalendar;
  modalControls;
  mainCalendar;

  constructor() {
    this.periodOffset = 0;

    this.date = new DateProvider();
    this.sidebarCalendar = new SidebarCalendar(this.date);
    this.modalControls = new EventCreationModal();
    this.mainCalendar = new MainCalendar(
      this.date.getOffsetGMT(),
      this.date.getFullWeekInformation(this.periodOffset)
    );

    this.initialize();
  }

  // execs
  initialize() {
    this.renderCalendar();
    this.bindHeaderControls();
  }

  // displayers
  renderCalendar() {
    this.renderMainCalendar();
    this.displayHeaderDate();
  }
  displayHeaderDate() {
    const headerDateDisplay = document.querySelector(
      '#header-date'
    ) as HTMLElement;
    const monthName = this.date.getMonthName(
      this.mainCalendar.weekInfo[0].month
    );
    const fullMonthName =
      FullMonthNames[monthName as keyof typeof FullMonthNames];
    const displayYear = this.mainCalendar.weekInfo[0].year;

    headerDateDisplay.innerText = `${fullMonthName} ${displayYear}`;
  }
  renderMainCalendar() {
    this.mainCalendar = new MainCalendar(
      this.date.getOffsetGMT(),
      this.date.getFullWeekInformation(this.periodOffset)
    );
  }

  // misc
  bindHeaderControls() {
    const nextPeriodBtn = document.querySelector(
      '#next-period-btn'
    ) as HTMLElement;
    const prevPeriodBtn = document.querySelector(
      '#prev-period-btn'
    ) as HTMLElement;
    const todayBtn = document.querySelector('#show-today-btn') as HTMLElement;
    const createEventBtn = document.querySelector(
      '#create-event-btn'
    ) as HTMLElement;

    nextPeriodBtn.addEventListener('click', () => {
      this.periodOffset++;

      this.renderCalendar();
    });
    prevPeriodBtn.addEventListener('click', () => {
      this.periodOffset--;

      this.renderCalendar();
    });
    todayBtn.addEventListener('click', () => {
      this.periodOffset = 0;

      this.renderCalendar();
    });
    createEventBtn.addEventListener('click', () => {
      this.modalControls.initialize();

      const formContainer = document.querySelector(
        '#modal-form'
      ) as HTMLFormElement;
      formContainer.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this.modalControls.isComplete) this.renderCalendar();
      });
    });
  }
}
