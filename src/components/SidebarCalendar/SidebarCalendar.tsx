import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import SidebarCalendarBody from '../SidebarCalendarBody/SidebarCalendarBody';
import SidebarCalendarHeader from '../SidebarCalendarHeader/SidebarCalendarHeader';
import styles from './SidebarCalendar.module.scss';
import Modal from '../Modal/Modal';
import ModalEventCreation from '../ModalEventCreation/ModalEventCreation';
import WeekOffsetContext from '../../context/WeekOffsetContext';

const SidebarCalendar = () => {
  const [weekOffset] = useContext(WeekOffsetContext);
  const [showModal, setShowModal] = useState(false);
  const monthOffsetState = useState(0);
  const [, setMonthOffset] = monthOffsetState;

  const handleModalClick = () => setShowModal(true);
  useEffect(() => {
    setMonthOffset(0);
  }, [weekOffset, setMonthOffset]);

  return (
    <aside className={styles.sidebar}>
      <Button onClick={handleModalClick} skin="simple" size="large">
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
