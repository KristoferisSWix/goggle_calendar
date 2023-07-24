import EventInteractionModal from "./EventInteractionModal.js";

export default class MainCalendar {
  constructor(gmt, week) {
    this.gmtOffset = gmt;
    this.weekInfo = week;
    this.userEvents = JSON.parse(localStorage.getItem("userEvents")) || [];
    this.displayWeek();
  }

  // displayers
  displayWeek() {
    this.removeNotRelevantEvents();

    const relevantEvents = this.filterEvents();
    relevantEvents.forEach((ev) => this.displayEvent(ev));

    this.displayWeekHead();
    this.displayGMT();
  }
  displayWeekHead() {
    const weekInformation = this.weekInfo;
    const mainCalendarHead = document.querySelector("#main-calendar-head");
    const gmtElement = [...mainCalendarHead.children].slice(0, 1)[0];

    mainCalendarHead.innerHTML = "";
    mainCalendarHead.append(gmtElement);

    for (let day of weekInformation) {
      const th = document.createElement("th");
      th.innerHTML = `<h3 class="${
        day.isCurrent
          ? "main-calendar-th-heading main-calendar-th-heading-active"
          : "main-calendar-th-heading"
      }">${day.weekDayName} <br/> <span class="${
        day.isCurrent ? "main-calendar-th-heading-number-active" : ""
      }">${day.day}</span></h3>`;

      mainCalendarHead.append(th);
    }
  }
  displayEvent(data) {
    const contentContainer = document.querySelector("#main-calendar-body");
    const displayContainer = document.createElement("td");
    const eventStartDate = new Date(data.eventTimeStart);
    const eventEndDate = new Date(data.eventTimeEnd);
    const numericalDayWeek = eventStartDate.getDay();
    const eventHours = eventStartDate.getHours();
    const eventMinutes = eventStartDate.getMinutes() / 60;

    const calculatedWidth = (window.innerWidth - 260 - 80) / 7;
    const calculatedHeight =
      50 *
      ((eventEndDate.getTime() - eventStartDate.getTime()) / (1000 * 60 * 60));
    const calculatedLeftOffset = 80 + calculatedWidth * numericalDayWeek;
    const calculatedTopOffset = 50 * (eventHours + eventMinutes);

    displayContainer.style = `top:${calculatedTopOffset}px;left:${calculatedLeftOffset}px;width:${
      calculatedWidth * 0.9
    }px;height:${calculatedHeight}px`;

    displayContainer.className = "event-container";
    displayContainer.innerHTML = `${data.eventTitle}`;
    displayContainer.setAttribute("data-event", JSON.stringify(data));

    displayContainer.addEventListener("click", (e) => {
      const eventData = JSON.parse(e.target.dataset.event);

      // could pass data directly, just wanted to use dataset
      new EventInteractionModal(eventData);

      const removeModalBtn = document.querySelector("#remove-modal-btn");
      removeModalBtn.addEventListener("click", () => {
        this.userEvents = JSON.parse(localStorage.getItem("userEvents")) || [];
        this.displayWeek();
      });
    });

    contentContainer.append(displayContainer);
  }
  displayGMT() {
    const headingGMT = document.querySelector("#main-calendar-gmt");
    headingGMT.innerHTML = `GMT${this.gmtOffset}`;
  }

  //  misc
  filterEvents() {
    const displayedWeekInfo = this.weekInfo;
    const relevantEvents = this.userEvents.filter((userEvent) => {
      const eventDate = new Date(userEvent.eventTimeStart);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();
      return displayedWeekInfo.some(
        ({ year, month, day }) =>
          year == eventYear && month == eventMonth && day == eventDay
      );
    });
    return relevantEvents;
  }
  removeNotRelevantEvents() {
    const displayedEvents = [...document.querySelectorAll(".event-container")];
    displayedEvents.forEach((ev) => ev.remove());
  }
}
