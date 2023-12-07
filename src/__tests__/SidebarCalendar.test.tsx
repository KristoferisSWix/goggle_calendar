import {
  afterEach,
  beforeEach,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import SidebarCalendar from '../components/SidebarCalendar/SidebarCalendar';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(() => {
  render(<SidebarCalendar />);
});
afterEach(() => {
  cleanup();
});

it('renders correct date', () => {
  expect(screen.getByTestId('sidebarCalendarDate').innerText).toBe(
    `April, 2001`
  );
});
