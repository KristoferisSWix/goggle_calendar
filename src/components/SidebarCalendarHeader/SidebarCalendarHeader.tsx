import Button from '../Button/Button';
import styles from './SidebarCalendarHeader.module.scss';
import { FullMonthNames } from '../../types';
import Image from '../Image/Image';
import getMonthName from '../../utils/getMonthName';
import getFullYear from '../../utils/getFullYear';
import { useContext } from 'react';
import WeekOffsetContext from '../../context/WeekOffsetContext';

interface ISidebarCalendarHeader {
  monthOffsetState: [number, React.Dispatch<React.SetStateAction<number>>];
}

const SidebarCalendarHeader = ({
  monthOffsetState,
}: ISidebarCalendarHeader) => {
  const [weekOffset] = useContext(WeekOffsetContext);
  const [monthOffset, setMonthOffset] = monthOffsetState;

  const displayMonthName =
    FullMonthNames[getMonthName(monthOffset, weekOffset)];
  const displayYear = getFullYear(monthOffset, weekOffset);
  const handleClickPrev = () => {
    setMonthOffset((lastOffset) => lastOffset - 1);
  };
  const handleClickNext = () => {
    setMonthOffset((lastOffset) => lastOffset + 1);
  };

  return (
    <section className={styles.header}>
      <h5 className={styles.heading} data-testid="sidebarCalendarDate">
        {displayMonthName}, {displayYear}
      </h5>
      <div className={styles.controls}>
        <Button
          id="sidebar-calendar-previous-period"
          onClick={handleClickPrev}
          size="small"
          testId="prevMonthButton"
        >
          <Image
            size="iconS"
            src="./images/chevron-left-icon.svg"
            alt="go to previous month"
          />
        </Button>
        <Button
          size="small"
          id="sidebar-calendar-next-period"
          onClick={handleClickNext}
          testId="nextMonthButton"
        >
          <Image
            size="iconS"
            src="./images/chevron-right-icon.svg"
            alt="go to next month"
          />
        </Button>
      </div>
    </section>
  );
};

export default SidebarCalendarHeader;
