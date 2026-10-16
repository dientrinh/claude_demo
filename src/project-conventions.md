# Project conventions (give this to the model once, alongside the snippets)

- All logging goes through the AppLog utility, never console.* or winston directly.
- Service methods return a Result object (Result.success / Result.failure) instead of throwing.
