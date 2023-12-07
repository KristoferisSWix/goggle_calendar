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
import HeaderControls from '../components/HeaderControls/HeaderControls';

beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(() => {
  render(<HeaderControls />);
});
afterEach(() => {
  cleanup();
});

it('renders correct date', () => {
  expect(screen.getByTestId('headerDate').innerText).toBe(`April, 2001`);
});
