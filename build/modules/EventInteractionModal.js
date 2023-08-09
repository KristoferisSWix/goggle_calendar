var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetchUtil from '../utils/fetchUtil.js';
export default class EventInteractionModal {
    constructor(displayID) {
        this.displayID = displayID;
        this.displayModal();
    }
    // execs
    closeModal() {
        const modalContainer = document.querySelector('.event-modal-overlay');
        modalContainer.remove();
    }
    // displayers
    displayModal() {
        return __awaiter(this, void 0, void 0, function* () {
            const mainContainer = document.querySelector('main');
            const modalOverlay = document.createElement('section');
            const modalContent = document.createElement('div');
            modalContent.className = 'event-modal';
            modalOverlay.className = 'event-modal-overlay';
            const modalHeader = this.createHeader();
            modalContent.append(modalHeader);
            modalOverlay.append(modalContent);
            mainContainer.append(modalOverlay);
            const modalData = yield this.displayModalContent();
            modalContent.append(...modalData);
            this.bindModalButtons();
        });
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
    displayModalContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventData = yield this.getEvent();
            const parsedEventData = this.parseData(eventData);
            const modalData = [];
            for (let field in parsedEventData) {
                if (parsedEventData[field] &&
                    !field.includes('_')) {
                    const container = document.createElement('p');
                    container.className = 'event-modal-info';
                    container.innerHTML = `<span>${field}:</span> ${parsedEventData[field]}`;
                    modalData.push(container);
                }
            }
            return modalData;
        });
    }
    // misc
    removeEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            fetchUtil('DELETE', undefined, this.displayID);
        });
    }
    getEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = (yield fetchUtil('GET', undefined, this.displayID));
            return resp || [];
        });
    }
    parseData(data) {
        const unCamelize = (s) => s.replace(/[A-Z]/g, (x) => ` ${x.toLowerCase()}`);
        const manipulateObj = (obj, key, value) => {
            obj[key] = value;
        };
        const formatedObj = {};
        for (let field in data) {
            const key = unCamelize(field);
            manipulateObj(formatedObj, key, data[field]);
        }
        return formatedObj;
    }
    bindModalButtons() {
        const closeModalBtn = document.querySelector('#close-modal-btn');
        const modalContainer = document.querySelector('.event-modal-overlay');
        modalContainer.addEventListener('click', ({ target }) => {
            if (target instanceof HTMLElement &&
                target.className === 'event-modal-overlay')
                this.closeModal();
        });
        closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
    }
}
