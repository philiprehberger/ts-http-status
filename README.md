# @philiprehberger/http-status

[![CI](https://github.com/philiprehberger/ts-http-status/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-http-status/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@philiprehberger/http-status)](https://www.npmjs.com/package/@philiprehberger/http-status)

Typed HTTP status codes, reason phrases, and classification helpers for TypeScript

## Installation

```bash
npm install @philiprehberger/http-status
```

## Usage

```ts
import {
  Status,
  reasonPhrase,
  isSuccess,
  isRetryable,
  statusRange,
} from "@philiprehberger/http-status";

Status.OK; // 200
Status.NOT_FOUND; // 404

reasonPhrase(200); // "OK"
reasonPhrase(404); // "Not Found"

isSuccess(200); // true
isRetryable(503); // true
statusRange(404); // "4xx"
```

## API

| Export | Description |
| --- | --- |
| `Status` | Object with all common HTTP status codes as literal-typed constants |
| `reasonPhrase(status)` | Returns the reason phrase string for a status code |
| `isInformational(status)` | `true` for 100-199 |
| `isSuccess(status)` | `true` for 200-299 |
| `isRedirect(status)` | `true` for 300-399 |
| `isClientError(status)` | `true` for 400-499 |
| `isServerError(status)` | `true` for 500-599 |
| `statusRange(status)` | Returns `"1xx"` \| `"2xx"` \| `"3xx"` \| `"4xx"` \| `"5xx"` |
| `isRetryable(status)` | `true` for 408, 429, 500, 502, 503, 504 |
| `StatusCode` | Type union of all status code number literals |

## Development

```bash
npm install
npm run build
npm run typecheck
npm test
```

## License

MIT
