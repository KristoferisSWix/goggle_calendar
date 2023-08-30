import { it, expect, vi, beforeAll, afterAll, describe } from 'vitest';
import getWeekInfo from '../utils/getWeekInfo';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});

describe('week info', () => {
  it('no args', () => {
    const expectedResult = [
      {
        year: 2001,
        month: 3,
        day: 1,
        weekDayName: 'SUN',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 2,
        weekDayName: 'MON',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 3,
        weekDayName: 'TUE',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 4,
        weekDayName: 'WED',
        isCurrentDay: true,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 5,
        weekDayName: 'THU',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 6,
        weekDayName: 'FRI',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 7,
        weekDayName: 'SAT',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
    ];
    expect(expectedResult).toEqual(getWeekInfo());
  });
  it('week offset positive', () => {
    const expectedResult = [
      {
        year: 2001,
        month: 3,
        day: 8,
        weekDayName: 'SUN',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 9,
        weekDayName: 'MON',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 10,
        weekDayName: 'TUE',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 11,
        weekDayName: 'WED',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 12,
        weekDayName: 'THU',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 13,
        weekDayName: 'FRI',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
      {
        year: 2001,
        month: 3,
        day: 14,
        weekDayName: 'SAT',
        isCurrentDay: false,
        isCurrentMonth: true,
      },
    ];
    expect(expectedResult).toEqual(getWeekInfo(1));
  });
  it('week offset negative', () => {
    const expectedResult = [
      {
        year: 2001,
        month: 2,
        day: 25,
        weekDayName: 'SUN',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 26,
        weekDayName: 'MON',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 27,
        weekDayName: 'TUE',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 28,
        weekDayName: 'WED',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 29,
        weekDayName: 'THU',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 30,
        weekDayName: 'FRI',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
      {
        year: 2001,
        month: 2,
        day: 31,
        weekDayName: 'SAT',
        isCurrentDay: false,
        isCurrentMonth: false,
      },
    ];
    expect(expectedResult).toEqual(getWeekInfo(-1));
  });
});
