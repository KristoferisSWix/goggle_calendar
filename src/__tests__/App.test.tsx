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
import {
  RenderResult,
  act,
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import App from '../App';

let app: RenderResult;
beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
  fetchMock.mockResponse(
    JSON.stringify([
      {
        eventTitle: 'event-test',
        eventTimeStart: '2001-04-04T13:00',
        eventTimeEnd: '2001-04-04T14:00',
        eventGuest: '',
        eventRoom: '',
        eventLocation: '',
        eventDescription: '',
        hostDetails: 'Kristoferis Solovjov',
        eventStatus: 'busy',
        eventVisibility: 'default',
        eventAlert: '5min',
        id: 0,
      },
    ])
  );
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(async () => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  await act(() => {
    app = render(<App />);
  });
});
afterEach(() => {
  cleanup();
});

it('renders correct date', () => {
  expect(screen.getByTestId('headerDate').innerText).toBe(`April, 2001`);
});
describe('renrders', () => {
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
describe('sidebarCalendar', () => {
  describe('rerenders when sidebar calendar timeframe is changed', () => {
    it('forward', () => {
      act(() => {
        app.getByTestId('nextMonthButton').click();
      });
      expect(app.getByTestId('sidebarCalendarDate').innerText).toBe(
        'May, 2001'
      );
    });
    it('backwards', () => {
      act(() => {
        app.getByTestId('prevMonthButton').click();
      });
      expect(app.getByTestId('sidebarCalendarDate').innerText).toBe(
        'March, 2001'
      );
    });
  });
  describe('rerenders when main calendar timeframe is changed', () => {
    it('reset', () => {
      act(() => {
        for (let i = 0; i < 13; i++) {
          app.getByTestId('prevWeekButton').click();
        }
        app.getByTestId('todayButton').click();
      });
      expect(app.getByTestId('sidebarCalendarDate').innerText).toBe(
        'April, 2001'
      );
    });
    it('backwards', () => {
      act(() => {
        for (let i = 0; i < 3; i++) {
          app.getByTestId('prevWeekButton').click();
        }
      });
      expect(app.getByTestId('sidebarCalendarDate').innerText).toBe(
        'March, 2001'
      );
    });
    it('forward', () => {
      act(() => {
        for (let i = 0; i < 4; i++) {
          app.getByTestId('nextWeekButton').click();
        }
      });
      expect(app.getByTestId('sidebarCalendarDate').innerText).toBe(
        'May, 2001'
      );
    });
  });
});
describe('mainCalendar', () => {
  describe('rerenders when main calendar timeframe is changed', () => {
    it('reset', () => {
      act(() => {
        for (let i = 0; i < 13; i++) {
          app.getByTestId('prevWeekButton').click();
        }
        app.getByTestId('todayButton').click();
      });
      expect(app.getByTestId('headerDate').innerText).toBe('April, 2001');
    });
    it('backwards', () => {
      act(() => {
        for (let i = 0; i < 3; i++) {
          app.getByTestId('prevWeekButton').click();
        }
      });
      expect(app.getByTestId('headerDate').innerText).toBe('March, 2001');
    });
    it('forward', () => {
      act(() => {
        for (let i = 0; i < 4; i++) {
          app.getByTestId('nextWeekButton').click();
        }
      });
      expect(app.getByTestId('headerDate').innerText).toBe('May, 2001');
    });
  });
});
describe('useEvent', () => {
  it('displays event if there are any at viewing date', () => {
    expect(app.getByText('event-test')).toBeInTheDocument();
  });
  it("doesn't display event if there are none at viewing date", () => {
    const eventContainer = app.getByText('event-test');
    act(() => {
      app.getByTestId('prevWeekButton').click();
      app.rerender(<></>);
    });
    expect(app.container.contains(eventContainer)).toBe(false);
  });
});
describe('Modals', () => {
  it('opens creationModal when clicked "create event" button', () => {
    act(() => {
      app.getByTestId('createEvent').click();
    });
    expect(app.getByTestId('creationModal')).toBeInTheDocument();
  });
  it('closes modal when close button pressed', () => {
    act(() => {
      app.getByTestId('createEvent').click();
    });
    const modal = app.getByTestId('creationModal');
    act(() => {
      app.getByTestId('modalCloseButton').click();
    });
    expect(app.container.contains(modal)).toBe(false);
  });
  it('opens inspectionModal when clicked an event', () => {
    act(() => {
      app.getByText('event-test').click();
    });
    expect(app.getByText('loading')).toBeInTheDocument();
  });
});
