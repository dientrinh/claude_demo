# Notifications Service

Queues messages for recipients (for example, "your refund was processed") and lets callers look up what was sent to a given recipient.

## API

- `send(recipient, message)` — validates the input, stores a record with `status: "queued"`, and returns it. Throws `TypeError` if the recipient is empty or the message is not a non-empty string.
- `listFor(recipient)` — returns the recipient's notifications, oldest first.

## Notes

- Storage is currently in-memory and is lost when the process exits.
- Delivery (email, SMS, push) is not implemented yet; records stay `queued`.

## Tests

Run `npm test` from the project root.
