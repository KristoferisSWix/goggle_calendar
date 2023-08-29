import {
  afterEach,
  beforeEach,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
} from 'vitest';
import { RenderResult, render, screen } from '@testing-library/react';
import SidebarCalendar from '../components/SidebarCalendar/SidebarCalendar';

let sidebarCalendar: RenderResult;
beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(() => {
  sidebarCalendar = render(<SidebarCalendar />);
});
afterEach(() => {
  sidebarCalendar.unmount();
});

it('renders correct date', () => {
  const expectedDate = `April, 2001`;
  const renderedDate = screen.getByTestId('sidebarCalendarDate').innerText;

  expect(renderedDate).toBe(expectedDate);
});
