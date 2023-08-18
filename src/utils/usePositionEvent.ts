import { useEffect, useState } from "react";
import { UserEvent } from "../types";
import { WEEK_LENGTH } from "../constants";

const usePositionEvent = (data: UserEvent) => {
  const sidebarCalWidth = 260;
  const calendarTimeColumn = 60;
  const minimumCellWidth = 105.7;
  const canvasCellHeight = 50;
  const { eventTimeEnd, eventTimeStart } = data;
  const [windowWidht, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const eventStartDate = new Date(eventTimeStart);
  const eventEndDate = new Date(eventTimeEnd);
  const numericalDayWeek = eventStartDate.getDay();
  const eventHours = eventStartDate.getHours() - 1;
  const eventMinutes = eventStartDate.getMinutes() / 60;

  const calculatedOneDayWidth =
    windowWidht > 1060
      ? (windowWidht - sidebarCalWidth - calendarTimeColumn) / WEEK_LENGTH
      : minimumCellWidth;

  const calculatedHeight =
    canvasCellHeight *
    ((eventEndDate.getTime() - eventStartDate.getTime()) / (1000 * 60 * 60));
  const calculatedLeftOffset =
    calculatedOneDayWidth * numericalDayWeek +
    (data._timesOverlapping || 0) * 10;
  const calculatedTopOffset = canvasCellHeight * (eventHours + eventMinutes);
  const displayWidth =
    calculatedOneDayWidth * 0.9 - (data._timesOverlapping || 0) * 10;

  const finalizedStyle = {
    top: calculatedTopOffset,
    left: calculatedLeftOffset,
    width: displayWidth,
    height: calculatedHeight,
  };

  return finalizedStyle;
};
export default usePositionEvent;
