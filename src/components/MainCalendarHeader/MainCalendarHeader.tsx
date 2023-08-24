import { useContext } from 'react';
import styles from './MainCalendarHeader.module.scss';
import cx from 'classnames';
import DateContext from '../../context/DateContext';

const MainCalendarHeader = () => {
  const [date] = useContext(DateContext);
  const weekInfo = date.getWeekInfo();

  return (
    <section className={styles.mainCalendarHeader}>
      {weekInfo.map((day) => {
        return (
          <h3
            key={`main-${day.weekDayName}`}
            className={cx(styles.heading, {
              [styles.headingActive]: day.isCurrentDay,
            })}
          >
            {day.weekDayName} <br />
            <span
              className={cx(styles.headingNumber, {
                [styles.headingNumberActive]: day.isCurrentDay,
              })}
            >
              {day.day}
            </span>
          </h3>
        );
      })}
      <h3 className={styles.GMT} id="main-calendar-gmt">
        GMT{date.getOffsetGMT()}
      </h3>
    </section>
  );
};

export default MainCalendarHeader;
