import { useContext } from "react";
import Button from "../Button/Button";
import styles from "./HeaderControls.module.css";
import DateContext from "../../context/DateContext";
import DateProvider from "../../utils/DateProvider";
import { FullMonthNames } from "../../types";
import Image from "../Image/Image";

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
    <div className={styles.HeaderControls}>
      <Button className={styles["HeaderControls__hamburger-menu"]}>
        <Image
          src="./images/hamburger-icon.svg"
          alt="menu button"
          size="icon"
        />
      </Button>
      <h2 className={styles["HeaderControls__heading"]}>Calendar</h2>
      <Button
        onClick={handleClickToday}
        className={styles["HeaderControls__button"]}
        id="show-today-btn"
      >
        Today
      </Button>
      <Button
        className={styles["HeaderControls__offset-control"]}
        id="prev-period-btn"
        onClick={handleClickPrev}
      >
        <Image
          src="./images/chevron-left-icon.svg"
          alt="change timeframe to past"
        />
      </Button>
      <Button
        className={styles["HeaderControls__offset-control"]}
        id="next-period-btn"
        onClick={handleClickNext}
      >
        <Image
          src="./images/chevron-right-icon.svg"
          alt="change timeframe to future"
        />
      </Button>
      <h3 className={styles.HeaderControls__heading} id="header-date">
        {displayMonthName} {displayYear}
      </h3>
    </div>
  );
};

export default HeaderControls;
