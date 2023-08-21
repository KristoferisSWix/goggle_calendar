import styles from "./SidebarCalendarBody.module.css";
import cx from "classnames";
import { dayParams } from "../../types";
import Button from "../Button/Button";
import { useContext } from "react";
import DateContext from "../../context/DateContext";
interface ISidebarCalendarBody {
  monthOffset: number;
}
const SidebarCalendarBody = ({ monthOffset }: ISidebarCalendarBody) => {
  const [date] = useContext(DateContext);
  const monthInfo = date.getMonthInfo(monthOffset);
  const weekDayNames = monthInfo
    .slice(0, 7)
    .map(({ weekDayName }) => weekDayName);

  return (
    <section className={styles["Sidebar__display-container"]}>
      {weekDayNames.map((dayName) => {
        return (
          <h5
            key={`sidebar-${dayName}`}
            className={styles["Sidebar__day-name"]}
          >
            {dayName.slice(0, 1)}
          </h5>
        );
      })}
      {monthInfo.map(
        ({ year, month, day, isCurrentMonth, isCurrentDay }: dayParams) => {
          return (
            <Button
              key={`${year}-${month}-${day}`}
              className={`${
                isCurrentMonth
                  ? styles.Sibebar__day
                  : cx(styles.Sibebar__day, styles["Sibebar__day--not-current"])
              } ${isCurrentDay ? styles["Sibebar__day--active"] : ""}`}
            >
              {day}
            </Button>
          );
        }
      )}
    </section>
  );
};

export default SidebarCalendarBody;
