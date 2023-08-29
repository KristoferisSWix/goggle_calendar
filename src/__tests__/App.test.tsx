import {
  afterEach,
  beforeEach,
  it,
  expect,
  vi,
  describe,
  beforeAll,
  afterAll,
} from 'vitest';
import { RenderResult, render, screen } from '@testing-library/react';
import App from '../App';

let app: RenderResult;
beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(() => {
  app = render(<App />);
});
afterEach(() => {
  app.unmount();
});

it('renders correct date', () => {
  expect(screen.getByTestId('headerDate').innerText).toBe(`April, 2001`);
});

describe('display', () => {
  describe('header', () => {
    it('date', () => {
      expect(screen.getByTestId('headerDate')).toBeInTheDocument();
    });
    it('today button', () => {
      expect(screen.getByTestId('todayButton')).toBeInTheDocument();
    });
    it('next week button', () => {
      expect(screen.getByTestId('nextWeekButton')).toBeInTheDocument();
    });
    it('previous week button', () => {
      expect(screen.getByTestId('prevWeekButton')).toBeInTheDocument();
    });
  });
  describe('side calendar', () => {
    it('date', () => {
      expect(screen.getByTestId('sidebarCalendarDate')).toBeInTheDocument();
    });
    it('next month button', () => {
      expect(screen.getByTestId('nextMonthButton')).toBeInTheDocument();
    });
    it('previous month button', () => {
      expect(screen.getByTestId('prevMonthButton')).toBeInTheDocument();
    });
    it('calendar elements', () => {
      expect(screen.getAllByTestId('sideCalendarElement').length).toBe(42);
    });
  });
  describe('main calendar', () => {
    it('header', () => {
      expect(screen.getByTestId('mainCalendarHeader')).toBeInTheDocument();
    });
    it('canvas', () => {
      expect(screen.getByTestId('mainCalendarCanvas')).toBeInTheDocument();
    });
  });
});
