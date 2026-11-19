import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathThrough } from '../src/scripts/timeline.ts';

test('pathThrough: S-curves between columns, straight when stacked', () => {
  assert.equal(pathThrough([]), '');
  assert.equal(pathThrough([{ x: 0, y: 10 }, { x: 100, y: 50 }]), 'M 0 10 C 50 10, 50 50, 100 50');
  assert.equal(pathThrough([{ x: 19, y: 0 }, { x: 19, y: 200 }]), 'M 19 0 L 19 200');
});
