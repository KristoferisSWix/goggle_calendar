import { DisplayUserEvent, UserEvent } from '../types';
import fetchUtil from '../utils/fetchUtil.js';

export default class EventInteractionModal {
  displayID;

  constructor(displayID: string) {
    this.displayID = displayID;
    this.displayModal();
  }

  // execs
  closeModal() {
    const modalContainer = document.querySelector(
      '.event-modal-overlay'
    ) as HTMLElement;
    modalContainer.remove();
  }

  // displayers
  async displayModal() {
    const mainContainer = document.querySelector('main') as HTMLElement;
    const modalOverlay = document.createElement('section');
    const modalContent = document.createElement('div');
    modalContent.className = 'event-modal';
    modalOverlay.className = 'event-modal-overlay';
    const modalHeader = this.createHeader();

    modalContent.append(modalHeader);
    modalOverlay.append(modalContent);
    mainContainer.append(modalOverlay);

    const modalData = await this.displayModalContent();
    modalContent.append(...modalData);

    this.bindModalButtons();
  }
  createHeader() {
    const container = document.createElement('div');
    container.className = 'event-modal-header';
    const deleteIcon = document.createElement('button');
    deleteIcon.className = 'hover-background event-modal-close-btn';
    deleteIcon.id = 'remove-modal-btn';
    deleteIcon.innerHTML = `
  <img src="./images/trash-can-icon.svg" alt="delete event" />
  `;
    const closeIcon = document.createElement('button');
    closeIcon.className = 'hover-background event-modal-close-btn';
    closeIcon.id = 'close-modal-btn';
    closeIcon.innerHTML = `
  <img src="./images/xmark-icon.svg" alt="close modal" />
  `;
    container.append(deleteIcon, closeIcon);
    return container;
  }
  async displayModalContent() {
    const eventData = await this.getEvent();
    const parsedEventData = this.parseData(eventData);
    const modalData = [];
    for (let field in parsedEventData) {
      if (
        parsedEventData[field as keyof DisplayUserEvent] &&
        !field.includes('_')
      ) {
        const container = document.createElement('p');
        container.className = 'event-modal-info';
        container.innerHTML = `<span>${field}:</span> ${
          parsedEventData[field as keyof DisplayUserEvent]
        }`;
        modalData.push(container);
      }
    }
    return modalData;
  }

  // misc
  async removeEvent() {
    fetchUtil('DELETE', undefined, this.displayID);
  }
  async getEvent() {
    const resp = (await fetchUtil(
      'GET',
      undefined,
      this.displayID
    )) as UserEvent;
    return resp || [];
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
    return formatedObj;
  }

  bindModalButtons() {
    const closeModalBtn = document.querySelector(
      '#close-modal-btn'
    ) as HTMLElement;
    const modalContainer = document.querySelector(
      '.event-modal-overlay'
    ) as HTMLElement;

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
