import { FormEvent, useContext, useState } from "react";
import styles from "./ModalEventCreation.module.css";
import Button from "../Button/Button";
import FormOption from "../FormOption/FormOption";
import Dropdown from "../Dropdown/Dropdown";
import Image from "../Image/Image";
import Input from "../Input/Input";
import formHandler from "../../utils/formHandler";
import UserEventsContext from "../../context/UserEventsContext";

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
        const result = await formHandler(formData);
        if (result?.status === "error") {
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
      className={styles.ModalEventCreation}
      id="modal-form"
    >
      {error?.target === "uncought" && (
        <p className={styles["Modal--error"]}>{error.message}</p>
      )}
      <FormOption
        containerClassName={styles["title-container"]}
        id="event-title"
        labelChildren={null}
      >
        <Input
          className={styles["title-input"]}
          placeholder="Add title"
          id="event-title"
        />
      </FormOption>
      {error?.target === "title" && (
        <p className={styles["Modal--error"]}>{error.message}</p>
      )}
      <FormOption
        id="event-time"
        labelChildren={
          <Image src="./images/clock-icon.svg" alt="date and time" />
        }
      >
        <Input type="datetime-local" id="event-time" name="event-time-start" />
        -
        <Input
          type="datetime-local"
          id="event-time-end"
          name="event-time-end"
        />
      </FormOption>
      {error?.target === "time" && (
        <p className={styles["Modal--error"]}>{error.message}</p>
      )}
      <FormOption
        id="event-guest"
        labelChildren={<Image src="./images/users-icon.svg" alt="guests" />}
      >
        <Input id="event-guest" placeholder="Add guests" />
      </FormOption>
      <FormOption
        labelChildren={
          <Image src="./images/video-icon.svg" alt="video conference" />
        }
        id="video-conference"
      >
        <Button
          className={styles["event-conference-btn"]}
          type="button"
          id="video-conference"
        >
          Add video conferencing
        </Button>
      </FormOption>
      <FormOption
        id="event-room"
        labelChildren={
          <Image src="./images/door-icon.svg" alt="meeting room" />
        }
      >
        <Input id="event-room" placeholder="Add room" />
      </FormOption>
      <FormOption
        id="event-location"
        labelChildren={
          <Image src="./images/location-icon.svg" alt="location" />
        }
      >
        <Input id="event-location" placeholder="Add location" />
      </FormOption>
      <FormOption
        id="event-description"
        labelChildren={
          <Image src="./images/message-icon.svg" alt="description" />
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
            size="icon"
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
            size="icon"
          />
        }
      >
        <Dropdown
          id="event-status"
          optionArr={[
            {
              value: "busy",
              text: "Busy",
            },
            {
              value: "free",
              text: "Free",
            },
          ]}
        />
      </FormOption>
      <FormOption
        labelChildren={
          <Image
            src="./images/lock-icon.svg"
            alt="event visibility"
            size="icon"
          />
        }
        id="event-visibility"
      >
        <Dropdown
          id="event-visibility"
          optionArr={[
            {
              value: "default",
              text: "Default visibility",
            },
            {
              value: "public",
              text: "Public",
            },
            {
              value: "private",
              text: "Private",
            },
          ]}
        />
      </FormOption>
      <FormOption
        labelChildren={
          <Image src="./images/alert-icon.svg" alt="event alert" size="icon" />
        }
        id="event-alert"
      >
        <Dropdown
          id="event-alert"
          optionArr={[
            {
              value: "5min",
              text: "5 minutes before",
            },
            {
              value: "10min",
              text: "10 minutes before",
            },
            {
              value: "15min",
              text: "15 minutes before",
            },
            {
              value: "30min",
              text: "30 minutes before",
            },
            {
              value: "1hour",
              text: "1 hour before",
            },
            {
              value: "1day",
              text: "1 day before",
            },
            {
              value: "none",
              text: "None",
            },
          ]}
        />
      </FormOption>
      <div className={styles["event-modal-footer"]}>
        <Button className={styles["event-modal-more-options-btn"]}>
          More options
        </Button>
        <Button className={styles["event-modal-save-btn"]} id="save-event-btn">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ModalEventCreation;
