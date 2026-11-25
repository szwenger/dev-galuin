import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proximity } from '../src/scripts/headline.ts';

test('proximity: 1 at the pointer, 0 at and beyond the radius, falling in between', () => {
  assert.equal(proximity(0, 0, 100), 1);
  assert.equal(proximity(100, 0, 100), 0);
  assert.equal(proximity(300, 400, 100), 0);
  const mid = proximity(30, 40, 100);
  assert.ok(mid > 0 && mid < 1);
  assert.ok(proximity(10, 0, 100) > proximity(60, 0, 100));
});
