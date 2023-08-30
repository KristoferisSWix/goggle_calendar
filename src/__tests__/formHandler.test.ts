import { it, expect, describe } from 'vitest';
import formHandler from '../utils/formHandler';

describe("validation doesn't pass when", () => {
  it('no title', async () => {
    const data = [
      ['event-title', ''],
      ['event-time-start', ''],
      ['event-time-end', ''],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({
      message: 'invalid title',
      status: 'error',
      target: 'title',
    });
  });
  it('no time', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', ''],
      ['event-time-end', ''],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({
      message: 'invalid time',
      status: 'error',
      target: 'time',
    });
  });
  it('start date later than end date', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', '2023-08-30T09:57'],
      ['event-time-end', '2023-08-29T09:57'],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({
      message: 'invalid time',
      status: 'error',
      target: 'time',
    });
  });
  it('time not same day', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', '2023-08-28T09:57'],
      ['event-time-end', '2023-08-29T09:57'],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({
      message: 'invalid time',
      status: 'error',
      target: 'time',
    });
  });
});

it('returns status - success when validation passes', async () => {
  const data = [
    ['event-title', 'title'],
    ['event-time-start', '2023-08-28T09:57'],
    ['event-time-end', '2023-08-28T11:57'],
  ] as [string, string][];
  const result = await formHandler(data);
  expect(result).toEqual({
    status: 'success',
  });
});
