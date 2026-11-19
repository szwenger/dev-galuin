import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sectionAt } from '../src/scripts/theme.ts';

const S = [{ id: 'skills', top: 900 }, { id: 'projects', top: 1800 }, { id: 'contact', top: 4000 }];

test('sectionAt: last section whose top is above the reading line', () => {
  assert.equal(sectionAt(S.map((s) => ({ ...s, top: s.top - 2000 })), 300), 'projects');
  assert.equal(sectionAt(S.map((s) => ({ ...s, top: s.top - 3900 })), 300), 'contact');
});

test('sectionAt: still in the hero gives no anchor', () => {
  assert.equal(sectionAt(S, 300), null);
});
