import { expect, it } from 'vitest';
import usePositionEvent from '../utils/usePositionEvent';
import { renderHook } from '@testing-library/react';

const dataScheme = {
  eventTitle: '123',
  eventTimeStart: '2023-08-30T11:00',
  eventTimeEnd: '2023-08-30T12:00',
  eventGuest: '',
  eventRoom: '',
  eventLocation: '',
  eventDescription: '',
  hostDetails: 'Kristoferis Solovjov',
  eventStatus: 'busy',
  eventVisibility: 'default',
  eventAlert: '5min',
  id: 50,
};

it('returns styles with no overlap', () => {
  const data = {
    ...dataScheme,
    _timesOverlapping: 0,
  };
  const hook = renderHook(() => usePositionEvent(data));
  expect(hook.result.current).toEqual({
    top: 550,
    left: 317.1,
    width: 95.13000000000001,
    height: 50,
  });
});
it('should return correct styles when two events overlap', () => {
  const data = {
    ...dataScheme,
    _timesOverlapping: 1,
  };
  const hook = renderHook(() => usePositionEvent(data));
  expect(hook.result.current).toEqual({
    top: 550,
    left: 327.1,
    width: 85.13000000000001,
    height: 50,
  });
});
