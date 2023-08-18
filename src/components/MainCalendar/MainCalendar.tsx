import MainCalendarBody from "../MainCalendarBody/MainCalendarBody";
import MainCalendarHeader from "../MainCalendarHeader/MainCalendarHeader";
import styles from "./MainCalendar.module.css";

const MainCalendar = () => {
  return (
    <section className={styles.MainCalendar}>
      <MainCalendarHeader />
      <MainCalendarBody />
    </section>
  );
};

export default MainCalendar;
