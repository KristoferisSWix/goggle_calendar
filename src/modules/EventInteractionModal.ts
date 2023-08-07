import { DisplayUserEvent, UserEvent } from '../types';

export default class EventInteractionModal {
  displayData;

  constructor(displayData: UserEvent) {
    this.displayData = displayData;
    this.displayModal();
    this.bindModalButtons();
  }

  // execs
  closeModal() {
    const modalContainer = document.querySelector(
      '.event-modal-overlay'
    ) as HTMLElement;
    modalContainer.remove();
  }

  // displayers
  displayModal() {
    const mainContainer = document.querySelector('main') as HTMLElement;
    const modalOverlay = document.createElement('section');
    const modalContent = document.createElement('div');
    modalContent.className = 'event-modal';
    modalOverlay.className = 'event-modal-overlay';
    const modalHeader = `<div class="event-modal-header">
<button class="hover-background event-modal-close-btn" id="remove-modal-btn">
  <img src="./images/trash-can-icon.svg" alt="delete event" />
</button>
<button class="hover-background event-modal-close-btn" id="close-modal-btn">
  <img src="./images/xmark-icon.svg" alt="close modal" />
</button>
</div>`;
    const parsedData = this.parseData(this.displayData);
    const modalData = [];
    for (let field in parsedData) {
      if (parsedData[field as keyof DisplayUserEvent] && !field.includes('_'))
        modalData.push(
          `<p class="event-modal-info"><span>${field}:</span> ${
            parsedData[field as keyof DisplayUserEvent]
          }</p>`
        );
    }

    modalContent.innerHTML = `
    ${modalHeader}
    ${modalData.join(' ')}
`;
    modalOverlay.append(modalContent);
    mainContainer.append(modalOverlay);
  }

  // misc
  removeEvent() {
    const userEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');

    const filteredEvents = userEvents.filter(
      (ev: UserEvent) => ev._id !== this.displayData._id
    );
    localStorage.setItem('userEvents', JSON.stringify(filteredEvents));
  }
  parseData(data: UserEvent) {
    const unCamelize = (s: string) =>
      s.replace(/[A-Z]/g, (x) => ` ${x.toLowerCase()}`);
    const manipulateObj = <Obj, Key extends keyof Obj>(
      obj: Obj,
      key: Key,
      value: Obj[Key]
    ) => {
      obj[key] = value;
    };
    const formatedObj = {} as DisplayUserEvent;
    for (let field in data) {
      const key = unCamelize(field) as keyof DisplayUserEvent;
      manipulateObj(formatedObj, key, data[field as keyof UserEvent]);
    }
    console.log(formatedObj);
    return formatedObj;
  }

  bindModalButtons() {
    const removeModalBtn = document.querySelector(
      '#remove-modal-btn'
    ) as HTMLElement;
    const closeModalBtn = document.querySelector(
      '#close-modal-btn'
    ) as HTMLElement;
    const modalContainer = document.querySelector(
      '.event-modal-overlay'
    ) as HTMLElement;

    removeModalBtn.addEventListener('click', () => {
      this.closeModal();
      this.removeEvent();
    });
    modalContainer.addEventListener('click', ({ target }) => {
      if (
        target instanceof HTMLElement &&
        target.className === 'event-modal-overlay'
      )
        this.closeModal();
    });
    closeModalBtn.addEventListener('click', () => {
      this.closeModal();
    });
  }
}
