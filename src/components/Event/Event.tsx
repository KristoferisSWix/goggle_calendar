import styles from './Event.module.scss';
import usePositionEvent from '../../utils/usePositionEvent';
import { UserEvent } from '../../types';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalEventInspection from '../ModalEventInspection/ModalEventInspection';

interface IEvents {
  data: UserEvent;
}

const Event = ({ data }: IEvents) => {
  const finalizedStyle = usePositionEvent(data);
  const [showModal, setShowModal] = useState(false);
  const handleModalClick = () => setShowModal(true);

  return (
    <>
      <button
        id={data.id.toString()}
        className={styles.event}
        onClick={handleModalClick}
        style={finalizedStyle}
      >
        {data.eventTitle}
      </button>

      {showModal ? (
        <Modal closeModal={() => setShowModal(false)}>
          <ModalEventInspection
            id={data.id}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Event;
