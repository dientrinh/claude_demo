const sent = [];

// queues a notification for a recipient and returns the stored record
export const send = (recipient, message) => {
  if (!recipient) {
    throw new TypeError("send requires a recipient");
  }
  if (typeof message !== "string" || message.trim() === "") {
    throw new TypeError("send requires a non-empty message");
  }
  const record = { id: sent.length + 1, recipient, message, status: "queued" };
  sent.push(record);
  return record;
};

// returns all notifications queued for a recipient, oldest first
export const listFor = (recipient) => sent.filter((n) => n.recipient === recipient);
