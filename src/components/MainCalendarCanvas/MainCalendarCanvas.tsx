import {
  HOURS_IN_DAY,
  MAIN_CALENDAR_TIMES,
  WEEK_LENGTH,
} from '../../constants';
import EventList from '../EventList/EventList';
import styles from './MainCalendarCanvas.module.scss';

const MainCalendarCanvas = () => {
  const mainCalendarCanvas = [];
  for (let i = 0; i < WEEK_LENGTH; i++) {
    const day = [];
    for (let j = 0; j <= HOURS_IN_DAY; j++) {
      day.push(<div key={`${i}-${j}`} className={styles.cell}></div>);
    }
    mainCalendarCanvas.push(day);
  }

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
        {mainCalendarCanvas}
        <EventList />
      </article>
    </>
  );
};

export default MainCalendarCanvas;
