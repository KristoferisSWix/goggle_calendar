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
import HeaderControls from '../components/HeaderControls/HeaderControls';

let headerControls: RenderResult;
beforeAll(() => {
  vi.useFakeTimers().setSystemTime(new Date('2001-04-04'));
});
afterAll(() => {
  vi.useRealTimers();
});
beforeEach(() => {
  headerControls = render(<HeaderControls />);
});
afterEach(() => {
  headerControls.unmount();
});

it('renders correct date', () => {
  const expectedDate = `April, 2001`;
  const renderedDate = screen.getByTestId('headerDate').innerText;

  expect(renderedDate).toBe(expectedDate);
});
