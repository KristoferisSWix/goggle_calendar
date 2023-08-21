import MainCalendarCanvas from "../MainCalendarCanvas/MainCalendarCanvas";
import styles from "./MainCalendarBody.module.css";

const MainCalendarBody = () => {
  return (
    <section className={styles.MainCalendarBody}>
      <MainCalendarCanvas />
    </section>
  );
};

export default MainCalendarBody;
