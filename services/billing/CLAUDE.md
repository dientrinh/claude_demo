# Billing Service

- All monetary amounts are integers in cents. Never use floats.
- Every charge function must be idempotent and accept an `idempotencyKey`.
