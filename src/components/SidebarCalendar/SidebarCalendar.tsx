import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import SidebarCalendarBody from "../SidebarCalendarBody/SidebarCalendarBody";
import SidebarCalendarHeader from "../SidebarCalendarHeader/SidebarCalendarHeader";
import styles from "./SidebarCalendar.module.css";
import Modal from "../Modal/Modal";
import ModalEventCreation from "../ModalEventCreation/ModalEventCreation";
import DateContext from "../../context/DateContext";

const SidebarCalendar = () => {
  const [date] = useContext(DateContext);
  const [showModal, setShowModal] = useState(false);
  const monthOffsetState = useState(0);
  const handleModalClick = () => setShowModal(true);

  useEffect(() => {
    const [, setMonthOffset] = monthOffsetState;
    setMonthOffset(0);
  }, [date, monthOffsetState]);

  return (
    <aside className={styles.Sidebar}>
      <Button
        onClick={handleModalClick}
        className={styles["Sidebar__create-event"]}
      >
        Create Event
      </Button>
      {showModal ? (
        <Modal closeModal={() => setShowModal(false)}>
          <ModalEventCreation closeModal={() => setShowModal(false)} />
        </Modal>
      ) : null}

      <SidebarCalendarHeader monthOffsetState={monthOffsetState} />
      <SidebarCalendarBody monthOffset={monthOffsetState[0]} />
    </aside>
  );
};

export default SidebarCalendar;
