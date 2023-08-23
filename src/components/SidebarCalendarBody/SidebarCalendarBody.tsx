import styles from './SidebarCalendarBody.module.scss';
import cx from 'classnames';
import { dayParams } from '../../types';
import Button from '../Button/Button';
import { useContext } from 'react';
import DateContext from '../../context/DateContext';
interface ISidebarCalendarBody {
  monthOffset: number;
}
const SidebarCalendarBody = ({ monthOffset }: ISidebarCalendarBody) => {
  const [date] = useContext(DateContext);
  const monthInfo = date.getMonthInfo(monthOffset);
  const weekDayNames = monthInfo
    .slice(0, 7)
    .map(({ weekDayName }) => weekDayName);

  return (
    <section className={styles.container}>
      {weekDayNames.map((dayName) => {
        return (
          <h5 key={`sidebar-${dayName}`} className={styles.notCurrent}>
            {dayName.slice(0, 1)}
          </h5>
        );
      })}
      {monthInfo.map(
        ({ year, month, day, isCurrentMonth, isCurrentDay }: dayParams) => {
          return (
            <div key={`${year}-${month}-${day}`} className={styles.box}>
              <Button
                size="small"
                theme={isCurrentMonth && isCurrentDay ? 'active' : undefined}
              >
                <span
                  className={cx(
                    isCurrentMonth ? styles.current : styles.notCurrent,
                    isCurrentDay && isCurrentMonth ? styles.today : ''
                  )}
                >
                  {day}
                </span>
              </Button>
            </div>
          );
        }
      )}
    </section>
  );
};

export default SidebarCalendarBody;
