import { it, expect, vi, afterEach } from 'vitest';
import getOffsetGMT from '../utils/getOffsetGMT';

it('timezone UTC (set in package.json)', () => {
  expect(getOffsetGMT()).toBe('00');
});
