# Changelog

## 0.1.0 — 2026-03-20

### Added

- `Status` object with all common HTTP status codes as literal-typed constants
- `reasonPhrase` function to map status codes to reason phrase strings
- Classification type guards: `isInformational`, `isSuccess`, `isRedirect`, `isClientError`, `isServerError`
- `statusRange` function returning `"1xx"` | `"2xx"` | `"3xx"` | `"4xx"` | `"5xx"`
- `isRetryable` helper for identifying retryable status codes (408, 429, 500, 502, 503, 504)
- `StatusCode` type as a union of all status code number literals
