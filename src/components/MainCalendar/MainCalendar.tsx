import MainCalendarBody from '../MainCalendarBody/MainCalendarBody';
import MainCalendarHeader from '../MainCalendarHeader/MainCalendarHeader';
import styles from './MainCalendar.module.scss';

const MainCalendar = () => {
  return (
    <section className={styles.mainCalendar}>
      <MainCalendarHeader />
      <MainCalendarBody />
    </section>
  );
};

export default MainCalendar;
