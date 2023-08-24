import {
  HOURS_IN_DAY,
  MAIN_CALENDAR_TIMES,
  WEEK_LENGTH,
} from '../../constants';
import EventList from '../EventList/EventList';
import styles from './MainCalendarCanvas.module.scss';

const MainCalendarCanvas = () => {
  return (
    <>
      <article className={styles.timeColumn}>
        {MAIN_CALENDAR_TIMES.map((time) => {
          return (
            <div key={time} className={styles.timeContainer}>
              <h3 className={styles.timeContent}>{time}</h3>
            </div>
          );
        })}
      </article>
      <article className={styles.mainCalendarCanvas}>
        {Array.from({ length: WEEK_LENGTH }, (_, i) =>
          Array.from({ length: HOURS_IN_DAY + 1 }, (_, j) => (
            <div key={`${i}-${j}`} className={styles.cell}></div>
          ))
        )}
        <EventList />
      </article>
    </>
  );
};

export default MainCalendarCanvas;
