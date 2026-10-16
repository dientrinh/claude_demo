import { test } from "node:test";
import assert from "node:assert/strict";
import { send, listFor } from "./index.js";

test("send queues a notification with a queued status", () => {
  const record = send("user-notify-1", "Your refund was processed");

  assert.equal(record.recipient, "user-notify-1");
  assert.equal(record.message, "Your refund was processed");
  assert.equal(record.status, "queued");
});

test("send without a recipient throws a TypeError", () => {
  assert.throws(() => send("", "hello"), TypeError);
});

test("send with an empty message throws a TypeError", () => {
  assert.throws(() => send("user-notify-2", "   "), TypeError);
  assert.throws(() => send("user-notify-2", undefined), TypeError);
});

test("listFor returns only the recipient's notifications, oldest first", () => {
  const first = send("user-notify-3", "first");
  send("user-notify-4", "other recipient");
  const second = send("user-notify-3", "second");

  assert.deepEqual(listFor("user-notify-3"), [first, second]);
});
