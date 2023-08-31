import { EVENTS_URL } from '../../constants';
import { UserEvent } from '../../types';
import styles from './ModalEventInspection.module.scss';
import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import UserEventsContext from '../../context/UserEventsContext';

interface IModalEventCreation {
  closeModal: () => void;
  id: number;
}
const ModalEventInspection = ({ closeModal, id }: IModalEventCreation) => {
  const [data, setData] = useState<null | UserEvent>(null);
  const [, setUserEvents] = useContext(UserEventsContext);
  const [error, setError] = useState(false);

  const handleClick = () => {
    (async () => {
      await fetch(EVENTS_URL + '/' + id.toString(), {
        method: 'DELETE',
      }).catch(() => console.log('didnt delte'));
      setUserEvents([]);
    })().catch((e) => console.log(e));

    closeModal();
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(EVENTS_URL + '/' + id.toString());
      const parsed = (await res.json()) as UserEvent;
      setData(parsed);
    };

    fetchEvent().catch(() => setError(true));
  }, [id]);

  if (error) {
    return <p>something wrong</p>;
  }
  if (data) {
    const display = [];

    for (const el in data) {
      if (
        !data[el as keyof UserEvent] ||
        typeof data[el as keyof UserEvent] === 'number'
      ) {
        continue;
      }
      display.push(
        <p key={el} className={styles.info}>
          <span> {el}:</span> {data[el as keyof UserEvent]}
        </p>
      );
    }
    return (
      <div className={styles.container}>
        {display}
        <Button
          skin="destructive"
          size="large"
          onClick={handleClick}
          data-testid="removeEvent"
        >
          Remove Event
        </Button>
      </div>
    );
  }
  return <p>loading</p>;
};

export default ModalEventInspection;
