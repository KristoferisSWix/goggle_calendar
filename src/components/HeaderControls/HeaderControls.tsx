import { useContext } from 'react';
import Button from '../Button/Button';
import styles from './HeaderControls.module.scss';
import DateContext from '../../context/DateContext';
import DateProvider from '../../utils/DateProvider';
import { FullMonthNames } from '../../types';
import Image from '../Image/Image';

const HeaderControls = () => {
  const [date, setDate] = useContext(DateContext);
  const displayMonthName =
    FullMonthNames[date.getMonthName() as keyof typeof FullMonthNames];
  const { year: displayYear } = date.parseDateFromMonthOffset(0);
  const handleClickPrev = () =>
    setDate(({ weekOffset }) => new DateProvider(weekOffset - 1));
  const handleClickNext = () =>
    setDate(({ weekOffset }) => new DateProvider(weekOffset + 1));
  const handleClickToday = () => setDate(new DateProvider(0));

  return (
    <div className={styles.headerControls}>
      <Button>
        <Image
          src="./images/hamburger-icon.svg"
          alt="menu button"
          size="iconL"
        />
      </Button>
      <h2 className={styles.heading}>Calendar</h2>
      <Button
        onClick={handleClickToday}
        id="show-today-btn"
        skin="simple"
        size="medium"
      >
        Today
      </Button>
      <Button id="prev-period-btn" onClick={handleClickPrev}>
        <Image
          size="iconM"
          src="./images/chevron-left-icon.svg"
          alt="change timeframe to past"
        />
      </Button>
      <Button id="next-period-btn" onClick={handleClickNext}>
        <Image
          size="iconM"
          src="./images/chevron-right-icon.svg"
          alt="change timeframe to future"
        />
      </Button>
      <h3 className={styles.heading} id="header-date">
        {displayMonthName} {displayYear}
      </h3>
    </div>
  );
};

export default HeaderControls;
