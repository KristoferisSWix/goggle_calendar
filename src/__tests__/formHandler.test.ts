import { it, expect, describe } from 'vitest';
import formHandler from '../utils/formHandler';

const validationResponse = {
  message: 'invalid time' || 'invalid title',
  status: 'error' || 'success',
  target: 'title' || 'time',
};

describe("validation doesn't pass when", () => {
  it('has no title', async () => {
    const data = [
      ['event-title', ''],
      ['event-time-start', ''],
      ['event-time-end', ''],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({
      ...validationResponse,
      message: 'invalid title',
      target: 'title',
    });
  });
  it('has no time', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', ''],
      ['event-time-end', ''],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({ ...validationResponse, target: 'time' });
  });
  it('starts later ends', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', '2023-08-30T09:57'],
      ['event-time-end', '2023-08-29T09:57'],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({ ...validationResponse, target: 'time' });
  });
  it('starts and ends not on same day', async () => {
    const data = [
      ['event-title', 'title'],
      ['event-time-start', '2023-08-28T09:57'],
      ['event-time-end', '2023-08-29T09:57'],
    ] as [string, string][];
    const result = await formHandler(data);
    expect(result).toEqual({ ...validationResponse, target: 'time' });
  });
});

it('returns status - success when validation passes', async () => {
  const data = [
    ['event-title', 'title'],
    ['event-time-start', '2023-08-28T09:57'],
    ['event-time-end', '2023-08-28T11:57'],
  ] as [string, string][];
  fetchMock.mockResponseOnce(JSON.stringify({}));
  const result = await formHandler(data);
  expect(result).toEqual({
    status: 'success',
  });
});
