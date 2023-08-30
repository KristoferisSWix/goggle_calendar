import { it, expect, vi, beforeAll, afterAll, describe } from 'vitest';
import getFullYear from '../utils/getFullYear';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});

it('no args', () => {
  expect(2001).toEqual(getFullYear());
});
describe('week offset', () => {
  it('positive', () => {
    expect(2002).toEqual(getFullYear(undefined, 48));
  });
  it('negative', () => {
    expect(2000).toEqual(getFullYear(undefined, -48));
  });
});
describe('month offset', () => {
  it('positive', () => {
    expect(2002).toEqual(getFullYear(12));
  });
  it('negative', () => {
    expect(2000).toEqual(getFullYear(-12));
  });
});
describe('both offset', () => {
  it('both positive', () => {
    expect(2003).toEqual(getFullYear(12, 48));
  });
  it('both negative', () => {
    expect(1999).toEqual(getFullYear(-12, -48));
  });
  it('month positive, week negative', () => {
    expect(2002).toEqual(getFullYear(24, -48));
  });
  it('month negative, week positive', () => {
    expect(2002).toEqual(getFullYear(-12, 96));
  });
});
