# Changelog

## 0.1.3

- Standardize README badges and CHANGELOG formatting

## 0.1.2

- Standardize package.json configuration

## 0.1.1

- Add CI workflow

## 0.1.0

- `Status` object with all common HTTP status codes as literal-typed constants
- `reasonPhrase` function to map status codes to reason phrase strings
- Classification type guards: `isInformational`, `isSuccess`, `isRedirect`, `isClientError`, `isServerError`
- `statusRange` function returning `"1xx"` | `"2xx"` | `"3xx"` | `"4xx"` | `"5xx"`
- `isRetryable` helper for identifying retryable status codes
- `StatusCode` type as a union of all status code number literals
