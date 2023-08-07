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
  _timesOverlaping: number;
  _id: number;
}

export interface DisplayUserEvent {
  'event title': string;
  'event timeStart': string;
  'event timeEnd': string;
  'event guest': string;
  'event room': string;
  'event location': string;
  'event description': string;
  'event status': string;
  'event visibility': string;
  'event alert': string;
  '_times overlaping': number;
  _id: number;
}

export interface weekDay {
  year: number;
  month: number;
  day: number;
  weekDayName: string;
  isCurrent: boolean;
}

export type formDataValues = [string, FormDataEntryValue][];
export type isTodayType = { year: number; month: number; day: number };
export enum FullMonthNames {
  'Jan' = 'January',
  'Feb' = 'February',
  'Mar' = 'March',
  'Apr' = 'April',
  'May' = 'May',
  'Jun' = 'June',
  'Jul' = 'July',
  'Aug' = 'August',
  'Sep' = 'September',
  'Oct' = 'October',
  'Nov' = 'November',
  'Dec' = 'December',
}
