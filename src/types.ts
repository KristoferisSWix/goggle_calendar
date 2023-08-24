export interface UserEvent {
  eventTitle: string;
  eventTimeStart: string;
  eventTimeEnd: string;
  eventGuest: string;
  eventRoom: string;
  eventLocation: string;
  eventDescription: string;
  eventStatus: string;
  eventVisibility: string;
  eventAlert: string;
  id: number;
  _timesOverlapping?: number;
}

export type formDataValues = [string, FormDataEntryValue][];
export type isTodayType = { year: number; month: number; day: number };
export enum FullMonthNames {
  "Jan" = "January",
  "Feb" = "February",
  "Mar" = "March",
  "Apr" = "April",
  "May" = "May",
  "Jun" = "June",
  "Jul" = "July",
  "Aug" = "August",
  "Sep" = "September",
  "Oct" = "October",
  "Nov" = "November",
  "Dec" = "December",
}
export interface dayParams {
  year: number;
  month: number;
  day: number;
  weekDayName: string;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
}
