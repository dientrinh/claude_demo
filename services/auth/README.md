# Auth Service

The auth service handles user login for the platform.

## Exports

- `login(user)` takes a user object and returns `{ user, token }`. The token is a placeholder (`"x"`), so this is a stub and does not yet issue real credentials.

## Status

This is an early stub. Real token generation and credential checks are not implemented, and the authentication flow is still to be designed.
