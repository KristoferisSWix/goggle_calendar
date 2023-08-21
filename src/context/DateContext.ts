import { Dispatch, SetStateAction, createContext } from "react";
import DateProvider from "../utils/DateProvider";

const DateContext = createContext<
  [DateProvider, Dispatch<SetStateAction<DateProvider>>]
>([new DateProvider(0), () => {}]);

export default DateContext;
