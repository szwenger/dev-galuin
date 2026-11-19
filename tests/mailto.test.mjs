import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto } from '../src/scripts/mailto.ts';

test('buildMailto encodes ampersands, umlauts and newlines', () => {
  const url = buildMailto('a@b.c', 'Jo & Zoë', 'x@y.z', 'Hi\nthere & more');
  assert.ok(url.startsWith('mailto:a@b.c?subject='));
  const body = url.split('&body=')[1];
  assert.ok(body, 'has body param');
  assert.ok(url.includes('%26'), 'ampersand encoded');
  assert.ok(url.includes('%C3%AB'), 'umlaut encoded');
  assert.ok(body.includes('%0D%0A'), 'CRLF newline');
  assert.ok(!body.includes('&'), 'no raw & in body');
  assert.ok(body.includes('x%40y.z'), 'sender email in body');
});
