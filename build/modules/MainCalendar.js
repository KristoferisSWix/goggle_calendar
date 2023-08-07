import EventInteractionModal from './EventInteractionModal.js';
export default class MainCalendar {
    constructor(gmt, week) {
        this.gmtOffset = gmt;
        this.weekInfo = week;
        this.userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
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
        const mainCalendarHead = document.querySelector('#main-calendar-head');
        const gmtElement = [...mainCalendarHead.children].slice(0, 1)[0];
        mainCalendarHead.innerHTML = '';
        mainCalendarHead.append(gmtElement);
        for (let { isCurrent, weekDayName, day } of weekInformation) {
            const th = document.createElement('th');
            th.innerHTML = `<h3 class="${isCurrent
                ? 'main-calendar-th-heading main-calendar-th-heading-active'
                : 'main-calendar-th-heading'}">${weekDayName} <br/> <span class="${isCurrent ? 'main-calendar-th-heading-number-active' : ''}">${day}</span></h3>`;
            mainCalendarHead.append(th);
        }
    }
    displayEvent(data) {
        const { eventTimeEnd, eventTimeStart, _timesOverlaping, eventTitle } = data;
        const contentContainer = document.querySelector('#main-calendar-body');
        const displayContainer = document.createElement('td');
        const eventStartDate = new Date(eventTimeStart);
        const eventEndDate = new Date(eventTimeEnd);
        const numericalDayWeek = eventStartDate.getDay();
        const eventHours = eventStartDate.getHours();
        const eventMinutes = eventStartDate.getMinutes() / 60;
        const calculatedOneDayWidth = (window.innerWidth - 260 - 80) / 7;
        const calculatedHeight = 50 *
            ((eventEndDate.getTime() - eventStartDate.getTime()) / (1000 * 60 * 60));
        const calculatedLeftOffset = 80 + calculatedOneDayWidth * numericalDayWeek + _timesOverlaping * 20;
        const calculatedTopOffset = 50 * (eventHours + eventMinutes);
        const displayWidth = calculatedOneDayWidth * 0.9 - _timesOverlaping * 20;
        displayContainer.style.cssText = `top:${calculatedTopOffset}px;left:${calculatedLeftOffset}px;width:${displayWidth}px;height:${calculatedHeight}px`;
        displayContainer.className = 'event-container';
        displayContainer.innerHTML = `${eventTitle}`;
        displayContainer.setAttribute('data-event', JSON.stringify(data));
        displayContainer.addEventListener('click', ({ target }) => {
            if (!target || !(target instanceof HTMLElement))
                return;
            const eventData = JSON.parse(target.dataset.event || '');
            // could pass data directly, just wanted to use dataset
            new EventInteractionModal(eventData);
            const removeModalBtn = document.querySelector('#remove-modal-btn');
            removeModalBtn.addEventListener('click', () => {
                this.userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
                this.displayWeek();
            });
        });
        contentContainer.append(displayContainer);
    }
    displayGMT() {
        const headingGMT = document.querySelector('#main-calendar-gmt');
        headingGMT.innerHTML = `GMT${this.gmtOffset}`;
    }
    //  misc
    filterEvents() {
        const displayedWeekInfo = this.weekInfo;
        const relevantEvents = this.userEvents.filter((userEvent, i) => {
            const timesOverlaping = this.checkIfInInterval(new Date(userEvent.eventTimeStart).getTime(), userEvent._id);
            this.userEvents[i]._timesOverlaping = timesOverlaping;
            const eventDate = new Date(userEvent.eventTimeStart);
            const eventDay = eventDate.getDate();
            const eventMonth = eventDate.getMonth();
            const eventYear = eventDate.getFullYear();
            return displayedWeekInfo.some(({ year, month, day }) => year == eventYear && month == eventMonth && day == eventDay);
        });
        return relevantEvents;
    }
    checkIfInInterval(startTime, id) {
        const timesInInterval = this.userEvents.reduce((acc, curr) => {
            const eventStartTime = new Date(curr.eventTimeStart).getTime();
            const eventEndTime = new Date(curr.eventTimeEnd).getTime();
            if (curr._id !== id &&
                eventEndTime >= startTime &&
                eventStartTime <= startTime) {
                if (curr._timesOverlaping) {
                    acc = curr._timesOverlaping;
                }
                return acc + 1;
            }
            return acc;
        }, 0);
        return timesInInterval;
    }
    removeNotRelevantEvents() {
        const displayedEvents = [...document.querySelectorAll('.event-container')];
        displayedEvents.forEach((ev) => ev.remove());
    }
}
