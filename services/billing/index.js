const processedCharges = new Map();

// a repeated idempotencyKey returns the original result without charging again
export const charge = (amount, idempotencyKey) => {
  if (!idempotencyKey) {
    throw new TypeError("charge requires an idempotencyKey");
  }
  if (processedCharges.has(idempotencyKey)) {
    return processedCharges.get(idempotencyKey);
  }
  const result = { amount, idempotencyKey, status: "ok" };
  processedCharges.set(idempotencyKey, result);
  return result;
};

const processedRefunds = new Map();

// amount is an integer in cents; a repeated idempotencyKey returns the original result without refunding again
export const refund = (amount, idempotencyKey) => {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new RangeError("refund amount must be a positive integer (cents)");
  }
  if (!idempotencyKey) {
    throw new TypeError("refund requires an idempotencyKey");
  }
  if (processedRefunds.has(idempotencyKey)) {
    return processedRefunds.get(idempotencyKey);
  }
  const result = { amount, idempotencyKey, status: "refunded" };
  processedRefunds.set(idempotencyKey, result);
  return result;
};
