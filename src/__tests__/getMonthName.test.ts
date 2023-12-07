import { it, expect, vi, beforeAll, afterAll, describe } from 'vitest';
import getMonthName from '../utils/getMonthName';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});

it('should return current month name info when has no arguments passed', () => {
  expect(getMonthName()).toEqual('Apr'); 
});
describe('should return correct month name info when passed week offset', () => {
  it('positive', () => {
    expect(getMonthName(undefined, 4)).toEqual('May'); 
  });
  it('negative', () => {
    expect(getMonthName(undefined, -4)).toEqual('Mar'); 
  });
});
describe('should return correct month name info when passed month offset', () => {
  it('positive', () => {
    expect(getMonthName(1)).toEqual('May'); 
  });
  it('negative', () => {
    expect(getMonthName(-1)).toEqual('Mar'); 
  });
});
describe('should return correct month name info when passed week and month offset', () => {
  it('both positive', () => {
    expect(getMonthName(1, 4)).toEqual('Jun'); 
  });
  it('both negative', () => {
    expect(getMonthName(-1, -4)).toEqual('Feb'); 
  });
  it('month positive, week negative', () => {
    expect(getMonthName(2, -4)).toEqual('May'); 
  });
  it('month negative, week positive', () => {
    expect(getMonthName(-2, 8)).toEqual('Apr'); 
  });
});
