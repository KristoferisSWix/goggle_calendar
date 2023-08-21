import { useContext } from "react";
import styles from "./MainCalendarHeader.module.css";
import cx from "classnames";
import DateContext from "../../context/DateContext";

const MainCalendarHeader = () => {
  const [date] = useContext(DateContext);
  const weekInfo = date.getWeekInfo();

  return (
    <section className={styles.MainCalendarHeader}>
      {weekInfo.map((day) => {
        return (
          <h3
            key={`main-${day.weekDayName}`}
            className={
              day.isCurrentDay
                ? cx(
                    styles.MainCalendarHeader__heading,
                    styles["MainCalendarHeader__heading--active"]
                  )
                : styles.MainCalendarHeader__heading
            }
          >
            {day.weekDayName} <br />
            <span
              className={
                day.isCurrentDay
                  ? styles["MainCalendarHeader__heading-number--active"]
                  : styles["MainCalendarHeader__heading-number"]
              }
            >
              {day.day}
            </span>
          </h3>
        );
      })}
      <h3 className={styles.MainCalendarHeader__GMT} id="main-calendar-gmt">
        GMT{date.getOffsetGMT()}
      </h3>
    </section>
  );
};

export default MainCalendarHeader;
