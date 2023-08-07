// Could be factory relying on abstractions, now duplicate creation/interaction, will implement in react
export default class EventCreationModal {
    constructor() {
        this.isComplete = false;
    }
    initialize() {
        this.displayModal();
        this.bindModalButtons();
    }
    // displayers
    displayModal() {
        const mainContainer = document.querySelector('main');
        const modalContainer = document.createElement('section');
        modalContainer.className = 'event-modal-overlay';
        // template for modal
        modalContainer.innerHTML = `
          <div class="event-modal">
            <div class="event-modal-header">
              <button class="hover-background event-modal-close-btn" id="close-modal-btn">
                <img src="./images/xmark-icon.svg" alt="close modal" />
              </button>
            </div>
           <form class="event-modal" id="modal-form">
           <div class="event-title-container">
           <input
             type="text"
             name="event-title"
             class="event-title-input"
             placeholder="Add title"
           />
         </div>
         <div class="event-option-container">
           <label for="event-time" class="event-option-label-icon"
             ><img src="./images/clock-icon.svg" alt="date and time"
           /></label>
           <input
             type="datetime-local"
             name="event-time-start"
             id="event-time"
             class="event-fields-formating"
             /> -
             <input
             type="datetime-local"
             name="event-time-end"
             id="event-time"
             class="event-fields-formating"
             /> 
         </div>
         <div class="event-option-container">
           <label for="event-guest" class="event-option-label-icon"
             ><img src="./images/users-icon.svg" alt="guests"
           /></label>
           <input
             type="text"
             name="event-guest"
             id="event-guest"
             class="event-fields-formating"
             placeholder="Add guests"
           />
         </div>
         <div class="event-option-container">
           <img
             src="./images/video-icon.svg"
             alt="video conference"
             class="event-option-label-icon"
           />
           <button
             class="hover-background event-conference-btn event-fields-formating"
             type="button"
           >
             Add video conferencing
           </button>
         </div>
         <div class="event-option-container">
           <label for="event-room" class="event-option-label-icon">
             <img src="./images/door-icon.svg" alt="meeting room" />
           </label>
           <input
             type="text"
             name="event-room"
             id="event-room"
             class="event-fields-formating"
             placeholder="Add room"
           />
         </div>
         <div class="event-option-container">
           <label for="event-location" class="event-option-label-icon">
             <img src="./images/location-icon.svg" alt="location" />
           </label>
           <input
             type="text"
             name="event-location"
             id="event-location"
             class="event-fields-formating"
             placeholder="Add location"
           />
         </div>
         <div class="event-option-container">
           <label
             for="event-description"
             class="event-option-label-icon"
           >
             <img src="./images/message-icon.svg" alt="description" />
           </label>
           <input
             type="text"
             name="event-description"
             id="event-description"
             class="event-fields-formating"
             placeholder="Add description"
           />
         </div>
         <div class="event-option-container">
           <img
             src="./images/calendar-icon.svg"
             alt="host details"
             class="event-option-label-icon"
           />
           <h3 class="event-fields-formating">Kristoferis Solovjov</h3>
         </div>
         <div class="event-option-container">
           <img
             src="./images/briefcase-icon.svg"
             alt="event status"
             class="event-option-label-icon"
           />
           <select
             name="event-status"
             class="hover-background event-fields-formating select-chevron-down event-select-formating"
           >
             <option value="busy">Busy</option>
             <option value="free">Free</option>
           </select>
         </div>
         <div class="event-option-container">
           <img
             src="./images/lock-icon.svg"
             alt="event visibility"
             class="event-option-label-icon"
           />
           <select
             name="event-visibility"
             class="hover-background event-fields-formating select-chevron-down event-select-formating"
           >
             <option value="default">Default visibility</option>
             <option value="public">Public</option>
             <option value="private">Private</option>
           </select>
         </div>
         <div class="event-option-container">
           <img
             src="./images/alert-icon.svg"
             alt="event alert"
             class="event-option-label-icon"
           />
           <select
             name="event-alert"
             class="hover-background event-fields-formating select-chevron-down event-select-formating"
           >
             <option value="5min">5 minutes before</option>
             <option value="10min">10 minutes before</option>
             <option value="15min">15 minutes before</option>
             <option value="30min">30 minutes before</option>
             <option value="1hour">1 hour before</option>
             <option value="1day">1 day before</option>
             <option value="none">None</option>
           </select>
         </div>
         <div class="event-modal-footer">
           <button class="hover-background event-modal-more-options-btn">
             More options
           </button>
           <button class="hover-background event-modal-save-btn" id="save-event-btn">Save</button>
         </div>
           </form>
          </div>
        `;
        mainContainer.append(modalContainer);
    }
    // execs
    closeModal() {
        const modalContainer = document.querySelector('.event-modal-overlay');
        modalContainer.remove();
    }
    saveEvent(formatedForm) {
        const randomIdFn = () => parseInt(`${Math.random() * Math.random() * Math.random() * Math.pow(10, 20)}`);
        const userEventsArray = JSON.parse(localStorage.getItem('userEvents') || '[]');
        formatedForm._id = randomIdFn();
        // checking for dupes in ids
        while (userEventsArray.some((ev) => ev._id === formatedForm._id)) {
            formatedForm._id = randomIdFn();
        }
        userEventsArray.push(formatedForm);
        localStorage.setItem('userEvents', JSON.stringify(userEventsArray));
        this.isComplete = true;
    }
    // misc
    bindModalButtons() {
        const closeModalBtn = document.querySelector('#close-modal-btn');
        const modalContainer = document.querySelector('.event-modal-overlay');
        const formContainer = document.querySelector('#modal-form');
        modalContainer.addEventListener('click', ({ target }) => {
            if (target instanceof HTMLElement &&
                target.className === 'event-modal-overlay')
                this.closeModal();
        });
        closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        formContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formContainer);
            const values = [...formData.entries()];
            const isFieldsValid = this.fieldValidation(values);
            if (isFieldsValid)
                this.handleForm(values);
        });
    }
    fieldValidation(values) {
        var _a;
        const titleValue = values.filter((field) => field[0].includes('event-title'))[0];
        const dateValues = values.filter((field) => field[0].includes('event-time'));
        const eventStartDate = new Date(`${dateValues[0][1]}`);
        const eventEndDate = new Date(`${dateValues[1][1]}`);
        const hasTitle = Boolean(typeof titleValue[1] === 'string' ? (_a = titleValue[1]) === null || _a === void 0 ? void 0 : _a.trim().length : false);
        const endTimeGreaterThanStart = new Date(eventStartDate).getTime() < new Date(eventEndDate).getTime();
        const isSameDay = eventStartDate.getDate() !== eventEndDate.getDate();
        if (!hasTitle) {
            alert('Please enter a title');
            return false;
        }
        if (!endTimeGreaterThanStart || isSameDay) {
            alert('Please enter valid meeting time');
            return false;
        }
        return true;
    }
    handleForm(values) {
        const formatedForm = this.formateForm(values);
        this.saveEvent(formatedForm);
        this.closeModal();
    }
    formateForm(doubleArray) {
        const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
        const manipulateObj = (obj, key, value) => {
            obj[key] = value;
        };
        const formatedObj = {
            _timesOverlaping: 0,
        };
        for (let field of doubleArray) {
            const key = camelize(field[0]);
            if (typeof field[1] === 'string' || typeof field[1] === 'number') {
                manipulateObj(formatedObj, key, field[1]);
            }
        }
        return formatedObj;
    }
}
