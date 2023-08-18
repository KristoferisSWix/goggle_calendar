import { useContext } from "react";
import Button from "../Button/Button";
import styles from "./SidebarCalendarHeader.module.css";
import DateContext from "../../context/DateContext";
import { FullMonthNames } from "../../types";
import Image from "../Image/Image";

interface ISidebarCalendarHeader {
  monthOffsetState: [number, React.Dispatch<React.SetStateAction<number>>];
}

const SidebarCalendarHeader = ({
  monthOffsetState,
}: ISidebarCalendarHeader) => {
  const [date] = useContext(DateContext);
  const [monthOffset, setMonthOffset] = monthOffsetState;

  const displayMonthName =
    FullMonthNames[
      date.getMonthName(monthOffset) as keyof typeof FullMonthNames
    ];
  const displayYear = date.parseDateFromMonthOffset(monthOffset).year;

  const handleClickPrev = () => {
    setMonthOffset((lastOffset) => lastOffset - 1);
  };
  const handleClickNext = () => {
    setMonthOffset((lastOffset) => lastOffset + 1);
  };

  return (
    <section className={styles.Sidebar__header}>
      <h5 className={styles.Sidebar__heading}>
        {displayMonthName} {displayYear}
      </h5>
      <div className={styles.Sidebar__controls}>
        <Button
          className={styles["Sibedar__timeframe-button"]}
          id="sidebar-calendar-previous-period"
          onClick={handleClickPrev}
        >
          <Image
            src="./images/chevron-left-icon.svg"
            alt="go to previous month"
          />
        </Button>
        <Button
          className={styles["Sibedar__timeframe-button"]}
          id="sidebar-calendar-next-period"
          onClick={handleClickNext}
        >
          <Image src="./images/chevron-right-icon.svg" alt="go to next month" />
        </Button>
      </div>
    </section>
  );
};

export default SidebarCalendarHeader;
