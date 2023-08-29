import MainCalendarCanvas from '../MainCalendarCanvas/MainCalendarCanvas';
import styles from './MainCalendarBody.module.scss';

const MainCalendarBody = () => {
  return (
    <section
      className={styles.mainCalendarBody}
      data-testid="mainCalendarCanvas"
    >
      <MainCalendarCanvas />
    </section>
  );
};

export default MainCalendarBody;
