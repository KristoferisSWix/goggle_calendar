import { it, expect } from 'vitest';
import getOffsetGMT from '../utils/getOffsetGMT';

it('timezone UTC (set in package.json)', () => {
  expect(getOffsetGMT()).toBe('00');
});

// can't test other cases, because there's
// no way to change timezone running tests
