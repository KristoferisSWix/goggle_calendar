import { useContext } from 'react';
import Button from '../Button/Button';
import styles from './HeaderControls.module.scss';
import { FullMonthNames } from '../../types';
import Image from '../Image/Image';
import getMonthName from '../../utils/getMonthName';
import getFullYear from '../../utils/getFullYear';
import WeekOffsetContext from '../../context/WeekOffsetContext';

const HeaderControls = () => {
  const [weekOffset, setWeekOffset] = useContext(WeekOffsetContext);
  const displayMonthName = FullMonthNames[getMonthName(undefined, weekOffset)];
  const displayYear = getFullYear(undefined, weekOffset);
  const handleClickPrev = () => setWeekOffset((weekOffset) => weekOffset - 1);
  const handleClickNext = () => setWeekOffset((weekOffset) => weekOffset + 1);
  const handleClickToday = () => setWeekOffset(0);

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
        skin="simple"
        size="medium"
        testId="todayButton"
      >
        Today
      </Button>
      <Button onClick={handleClickPrev} testId="prevWeekButton">
        <Image
          size="iconM"
          src="./images/chevron-left-icon.svg"
          alt="change timeframe to past"
        />
      </Button>
      <Button onClick={handleClickNext} testId="nextWeekButton">
        <Image
          size="iconM"
          src="./images/chevron-right-icon.svg"
          alt="change timeframe to future"
        />
      </Button>
      <h3 className={styles.heading} id="header-date" data-testid="headerDate">
        {displayMonthName}, {displayYear}
      </h3>
    </div>
  );
};

export default HeaderControls;
