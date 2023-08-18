import {
  HOURS_IN_DAY,
  MAIN_CALENDAR_TIMES,
  WEEK_LENGTH,
} from "../../constants";
import EventList from "../EventList/EventList";
import styles from "./MainCalendarCanvas.module.css";

const MainCalendarCanvas = () => {
  const mainCalendarCanvas = [];
  for (let i = 0; i < WEEK_LENGTH; i++) {
    const day = [];
    for (let j = 0; j < HOURS_IN_DAY; j++) {
      day.push(
        <div
          key={`${i}-${j}`}
          className={styles.MainCalendarCanvas__cell}
        ></div>
      );
    }
    mainCalendarCanvas.push(day);
  }

  return (
    <>
      <article>
        {MAIN_CALENDAR_TIMES.map((time) => {
          return (
            <div
              key={time}
              className={styles["MainCalendarCanvas__time-container"]}
            >
              <h3 className={styles["time-container__content"]}>{time}</h3>
            </div>
          );
        })}
      </article>
      <article className={styles.MainCalendarCanvas}>
        {mainCalendarCanvas}
        <EventList />
      </article>
    </>
  );
};

export default MainCalendarCanvas;
