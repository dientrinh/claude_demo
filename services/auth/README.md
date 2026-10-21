# Auth Service

The auth service handles user authentication for the Acme Platform. It lives in `index.js` and currently exports one function:

- `login(user)` takes a user object and returns `{ user, token }`, where `token` is a placeholder string (`"x"`).

This is a stub. The token is not a real credential yet, so don't rely on it for access control. A production version needs real credential checks and signed tokens.

## Usage

```js
import { login } from "./index.js";

const session = login({ id: "123", name: "Ada" });
// { user: { id: "123", name: "Ada" }, token: "x" }
```
