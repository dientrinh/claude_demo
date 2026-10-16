import { test } from "node:test";
import assert from "node:assert/strict";
import { refund } from "./index.js";

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
