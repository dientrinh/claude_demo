import { test } from "node:test";
import assert from "node:assert/strict";
import { charge, refund } from "./index.js";

test("charge with a repeated idempotencyKey returns the original result without charging again", () => {
  const first = charge(1000, "charge-dup-1");
  const second = charge(1000, "charge-dup-1");

  assert.equal(second, first);
  assert.equal(second.status, "ok");
});

test("charge without an idempotencyKey throws a TypeError", () => {
  assert.throws(() => charge(1000), TypeError);
  assert.throws(() => charge(1000, ""), TypeError);
});

test("refund with a repeated idempotencyKey returns the original result without refunding again", () => {
  const first = refund(500, "refund-dup-1");
  const second = refund(500, "refund-dup-1");

  assert.equal(second, first);
  assert.equal(second.status, "refunded");
});

test("refund with a new idempotencyKey creates a separate refund", () => {
  const first = refund(500, "refund-new-1");
  const other = refund(500, "refund-new-2");

  assert.notEqual(other, first);
  assert.equal(other.idempotencyKey, "refund-new-2");
});
