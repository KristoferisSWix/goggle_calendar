import styles from "./Event.module.css";
import usePositionEvent from "../../utils/usePositionEvent";
import { UserEvent } from "../../types";
import Button from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ModalEventInspection from "../ModalEventInspection/ModalEventInspection";

interface IEvents {
  data: UserEvent;
}

const Event = ({ data }: IEvents) => {
  const finalizedStyle = usePositionEvent(data);
  const [showModal, setShowModal] = useState(false);
  const handleModalClick = () => setShowModal(true);

  return (
    <>
      <Button
        id={data.id.toString()}
        className={styles.Event}
        onClick={handleModalClick}
        style={finalizedStyle}
      >
        {data.eventTitle}
      </Button>

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
