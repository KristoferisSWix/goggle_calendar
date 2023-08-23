import MainCalendarCanvas from '../MainCalendarCanvas/MainCalendarCanvas';
import styles from './MainCalendarBody.module.scss';

const MainCalendarBody = () => {
  return (
    <section className={styles.mainCalendarBody}>
      <MainCalendarCanvas />
    </section>
  );
};

export default MainCalendarBody;
