import { useContext, useEffect, useRef, useState } from 'react';
import { EVENTS_URL } from '../constants';
import { UserEvent } from '../types';
import UserEventsContext from '../context/UserEventsContext';
import WeekOffsetContext from '../context/WeekOffsetContext';
import getWeekInfo from './getWeekInfo';

const useEvents = () => {
  const [weekOffset] = useContext(WeekOffsetContext);
  const [userEvents, setUserEvents] = useContext(UserEventsContext);
  const [viewingWeek, setViewingWeek] = useState(getWeekInfo());

  const useDeepCompareMemoize = (value: UserEvent[]) => {
    const deepCompareEquals = (a1: UserEvent[], a2: UserEvent[]) => {
      return (
        a1 === a2 ||
        (a1.length === a2.length && a1.every((f, i) => f.id === a2[i].id))
      );
    };
    const ref = useRef<UserEvent[]>([]);

    if (!deepCompareEquals(value, ref.current)) {
      ref.current = value;
    }

    return ref.current;
  };

  const deepCheckedUserEvents = useDeepCompareMemoize(userEvents);

  useEffect(() => {
    setViewingWeek(getWeekInfo(weekOffset));
  }, [weekOffset]);

  useEffect(() => {
    const {
      year: startYear,
      month: startMonth,
      day: startDay,
    } = viewingWeek[0];
    const { year: endYear, month: endMonth, day: endDay } = viewingWeek[6];
    const weekStartInMS = new Date(startYear, startMonth, startDay).getTime();
    const weekEndInMS = new Date(endYear, endMonth, endDay).getTime();

    fetch(EVENTS_URL)
      .then((res) => res.json())
      .then((evArr: UserEvent[]) => {
        const filteredArr = evArr.filter((userEv) => {
          const eventStartTimeInMS = new Date(userEv.eventTimeStart).getTime();
          return (
            weekStartInMS < eventStartTimeInMS &&
            weekEndInMS > eventStartTimeInMS
          );
        });
        filteredArr.sort((a, b) =>
          new Date(a.eventTimeStart).getTime() >
          new Date(b.eventTimeStart).getTime()
            ? 1
            : -1
        );
        filteredArr.map((userEv) => {
          const evStart = new Date(userEv.eventTimeStart).getTime();
          return (userEv._timesOverlapping = filteredArr.reduce((acc, cur) => {
            if (cur.id === userEv.id) {
              return acc;
            }
            const evReduceStart = new Date(cur.eventTimeStart).getTime();
            const evReduceEnd = new Date(cur.eventTimeEnd).getTime();
            if (evStart >= evReduceStart && evStart <= evReduceEnd) {
              return evStart === evReduceStart
                ? cur?._timesOverlapping === acc
                  ? acc + 1
                  : acc
                : acc + 1;
            }

            return acc;
          }, 0));
        });
        setUserEvents(filteredArr);
      })
      .catch((e) => console.log(e));
  }, [deepCheckedUserEvents, setUserEvents, viewingWeek]);
};

export default useEvents;
