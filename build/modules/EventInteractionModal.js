export default class EventInteractionModal {
    constructor(displayData) {
        this.displayData = displayData;
        this.displayModal();
        this.bindModalButtons();
    }
    // execs
    closeModal() {
        const modalContainer = document.querySelector('.event-modal-overlay');
        modalContainer.remove();
    }
    // displayers
    displayModal() {
        const mainContainer = document.querySelector('main');
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
            if (parsedData[field] && !field.includes('_'))
                modalData.push(`<p class="event-modal-info"><span>${field}:</span> ${parsedData[field]}</p>`);
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
        const filteredEvents = userEvents.filter((ev) => ev._id !== this.displayData._id);
        localStorage.setItem('userEvents', JSON.stringify(filteredEvents));
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
        console.log(formatedObj);
        return formatedObj;
    }
    bindModalButtons() {
        const removeModalBtn = document.querySelector('#remove-modal-btn');
        const closeModalBtn = document.querySelector('#close-modal-btn');
        const modalContainer = document.querySelector('.event-modal-overlay');
        removeModalBtn.addEventListener('click', () => {
            this.closeModal();
            this.removeEvent();
        });
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
