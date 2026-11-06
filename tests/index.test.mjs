import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('generates a clamp expression', () => {
  assert.equal(
    api.fluidScale({ minSize: 16, maxSize: 24, minViewport: 320, maxViewport: 1280 }).css,
    'clamp(1rem, 0.833333rem + 0.833333vw, 1.5rem)',
  );
});
test('returns expected slope', () => {
  assert.equal(
    api.fluidScale({ minSize: 10, maxSize: 20, minViewport: 100, maxViewport: 200 }).slope,
    0.1,
  );
});
test('constant size still emits valid scale', () => {
  const s = api.fluidScale({ minSize: 16, maxSize: 16, minViewport: 320, maxViewport: 1280 });
  assert.equal(s.slope, 0);
  assert.equal(s.intercept, 16);
});
test('rejects reversed size endpoints', () => {
  assert.throws(
    () => api.fluidScale({ minSize: 24, maxSize: 16, minViewport: 320, maxViewport: 1280 }),
    RangeError,
  );
});
test('rejects equal viewport endpoints', () => {
  assert.throws(
    () => api.fluidScale({ minSize: 16, maxSize: 24, minViewport: 320, maxViewport: 320 }),
    RangeError,
  );
});
test('rejects nonfinite input', () => {
  assert.throws(
    () => api.fluidScale({ minSize: NaN, maxSize: 24, minViewport: 320, maxViewport: 1280 }),
    RangeError,
  );
});
