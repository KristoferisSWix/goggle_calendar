import { it, expect, vi, beforeAll, afterAll, describe } from 'vitest';
import getMonthName from '../utils/getMonthName';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});

it('should return current month name info when has no arguments passed', () => {
  expect('Apr').toEqual(getMonthName());
});
describe('should return correct month name info when passed week offset', () => {
  it('positive', () => {
    expect('May').toEqual(getMonthName(undefined, 4));
  });
  it('negative', () => {
    expect('Mar').toEqual(getMonthName(undefined, -4));
  });
});
describe('should return correct month name info when passed month offset', () => {
  it('positive', () => {
    expect('May').toEqual(getMonthName(1));
  });
  it('negative', () => {
    expect('Mar').toEqual(getMonthName(-1));
  });
});
describe('should return correct month name info when passed week and month offset', () => {
  it('both positive', () => {
    expect('Jun').toEqual(getMonthName(1, 4));
  });
  it('both negative', () => {
    expect('Feb').toEqual(getMonthName(-1, -4));
  });
  it('month positive, week negative', () => {
    expect('May').toEqual(getMonthName(2, -4));
  });
  it('month negative, week positive', () => {
    expect('Apr').toEqual(getMonthName(-2, 8));
  });
});
