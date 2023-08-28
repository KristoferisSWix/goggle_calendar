import { Dispatch, SetStateAction, createContext } from 'react';

const WeekOffsetContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

export default WeekOffsetContext;
