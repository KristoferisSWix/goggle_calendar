import { it, expect, vi, beforeAll, afterAll, describe } from 'vitest';
import getFullYear from '../utils/getFullYear';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});

it('should return current year info when has no arguments passed', () => {
  expect(getFullYear()).toEqual(2001);
});
describe('should return correct year given week offset', () => {
  it('positive', () => {
    expect(getFullYear(undefined, 48)).toEqual(2002);
  });
  it('negative', () => {
    expect(getFullYear(undefined, -48)).toEqual(2000);
  });
});
describe('should return correct year given month offset', () => {
  it('positive', () => {
    expect(getFullYear(12)).toEqual(2002);
  });
  it('negative', () => {
    expect(getFullYear(-12)).toEqual(2000);
  });
});
describe('should return correct year given week and month offsets', () => {
  it('both positive', () => {
    expect(getFullYear(12, 48)).toEqual(2003);
  });
  it('both negative', () => {
    expect(getFullYear(-12, -48)).toEqual(1999);
  });
  it('month positive, week negative', () => {
    expect(getFullYear(24, -48)).toEqual(2002);
  });
  it('month negative, week positive', () => {
    expect(getFullYear(-12, 96)).toEqual(2002);
  });
});
