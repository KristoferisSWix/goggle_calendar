import { useContext } from 'react';
import styles from './MainCalendarHeader.module.scss';
import cx from 'classnames';
import WeekOffsetContext from '../../context/WeekOffsetContext';
import getWeekInfo from '../../utils/getWeekInfo';
import getOffsetGMT from '../../utils/getOffsetGMT';

const MainCalendarHeader = () => {
  const [weekOffset] = useContext(WeekOffsetContext);
  const weekInfo = getWeekInfo(weekOffset);

  return (
    <section
      className={styles.mainCalendarHeader}
      data-testid="mainCalendarHeader"
    >
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
        GMT{getOffsetGMT()}
      </h3>
    </section>
  );
};

export default MainCalendarHeader;
