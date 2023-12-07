import { FormEvent, useContext, useState } from 'react';
import styles from './ModalEventCreation.module.scss';
import Button from '../Button/Button';
import FormOption from '../FormOption/FormOption';
import Dropdown from '../Dropdown/Dropdown';
import Image from '../Image/Image';
import Input from '../Input/Input';
import formHandler from '../../utils/formHandler';
import UserEventsContext from '../../context/UserEventsContext';

interface IModalEventCreation {
  closeModal: () => void;
}
const ModalEventCreation = ({ closeModal }: IModalEventCreation) => {
  const [error, setError] = useState<{
    status: string;
    target?: string;
    message?: string;
  } | null>(null);
  const [, setUserEvents] = useContext(UserEventsContext);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      if (e.target instanceof HTMLFormElement) {
        const formData = new FormData(e.target);
        const formDataValues = [...formData.entries()];

        const result = await formHandler(formDataValues);
        if (result?.status === 'error') {
          setError(result);
        } else {
          setUserEvents([]);
          closeModal();
        }
      }
    })().catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.modalEventCreation}
      id="modal-form"
      data-testid="creationModal"
    >
      {error?.target === 'uncought' && (
        <p className={styles.error}>{error.message}</p>
      )}
      <FormOption
        containerClassName={styles.titleContainer}
        id="event-title"
        labelChildren={null}
      >
        <Input
          fill="fill"
          skin="noDefault"
          size="large"
          placeholder="Add title"
          id="event-title"
        />
      </FormOption>
      {error?.target === 'title' && (
        <p data-testid="titleError" className={styles.error}>
          {error.message}
        </p>
      )}
      <FormOption
        id="event-time"
        labelChildren={
          <Image
            src="./images/clock-icon.svg"
            alt="date and time"
            size="iconL"
          />
        }
      >
        <Input
          skin="noDefault"
          type="datetime-local"
          id="event-time"
          name="event-time-start"
        />
        -
        <Input
          skin="noDefault"
          type="datetime-local"
          id="event-time-end"
          name="event-time-end"
        />
      </FormOption>
      {error?.target === 'time' && (
        <p data-testid="timeError" className={styles.error}>
          {error.message}
        </p>
      )}
      <FormOption
        id="event-guest"
        labelChildren={
          <Image src="./images/users-icon.svg" alt="guests" size="iconL" />
        }
      >
        <Input id="event-guest" placeholder="Add guests" />
      </FormOption>

      <FormOption
        id="event-room"
        labelChildren={
          <Image src="./images/door-icon.svg" alt="meeting room" size="iconL" />
        }
      >
        <Input id="event-room" placeholder="Add room" />
      </FormOption>
      <FormOption
        id="event-location"
        labelChildren={
          <Image src="./images/location-icon.svg" alt="location" size="iconL" />
        }
      >
        <Input id="event-location" placeholder="Add location" />
      </FormOption>
      <FormOption
        id="event-description"
        labelChildren={
          <Image
            src="./images/message-icon.svg"
            alt="description"
            size="iconL"
          />
        }
      >
        <Input id="event-description" placeholder="Add description" />
      </FormOption>
      <FormOption
        id="host-details"
        labelChildren={
          <Image
            src="./images/calendar-icon.svg"
            alt="host details"
            size="iconL"
          />
        }
      >
        <Input
          id="host-details"
          placeholder="Enter host details"
          defaultValue="Kristoferis Solovjov"
        />
      </FormOption>
      <FormOption
        id="event-status"
        labelChildren={
          <Image
            src="./images/briefcase-icon.svg"
            alt="event status"
            size="iconL"
          />
        }
      >
        <Dropdown
          id="event-status"
          optionArr={[
            {
              value: 'busy',
              text: 'Busy',
            },
            {
              value: 'free',
              text: 'Free',
            },
          ]}
        />
      </FormOption>
      <FormOption
        labelChildren={
          <Image
            src="./images/lock-icon.svg"
            alt="event visibility"
            size="iconL"
          />
        }
        id="event-visibility"
      >
        <Dropdown
          id="event-visibility"
          optionArr={[
            {
              value: 'default',
              text: 'Default visibility',
            },
            {
              value: 'public',
              text: 'Public',
            },
            {
              value: 'private',
              text: 'Private',
            },
          ]}
        />
      </FormOption>
      <FormOption
        labelChildren={
          <Image src="./images/alert-icon.svg" alt="event alert" size="iconL" />
        }
        id="event-alert"
      >
        <Dropdown
          id="event-alert"
          optionArr={[
            {
              value: '5min',
              text: '5 minutes before',
            },
            {
              value: '10min',
              text: '10 minutes before',
            },
            {
              value: '15min',
              text: '15 minutes before',
            },
            {
              value: '30min',
              text: '30 minutes before',
            },
            {
              value: '1hour',
              text: '1 hour before',
            },
            {
              value: '1day',
              text: '1 day before',
            },
            {
              value: 'none',
              text: 'None',
            },
          ]}
        />
      </FormOption>
      <div className={styles.footer}>
        <Button type="button" skin="simple">
          More options
        </Button>
        <Button skin="standard" testId="saveEventButton">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ModalEventCreation;
