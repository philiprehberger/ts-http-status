import { describe, it } from "node:test";
import assert from "node:assert";
import {
  Status,
  reasonPhrase,
  isInformational,
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusRange,
  isRetryable,
} from "../../dist/index.js";

describe("Status", () => {
  it("has correct values for common codes", () => {
    assert.strictEqual(Status.OK, 200);
    assert.strictEqual(Status.CREATED, 201);
    assert.strictEqual(Status.NO_CONTENT, 204);
    assert.strictEqual(Status.BAD_REQUEST, 400);
    assert.strictEqual(Status.UNAUTHORIZED, 401);
    assert.strictEqual(Status.FORBIDDEN, 403);
    assert.strictEqual(Status.NOT_FOUND, 404);
    assert.strictEqual(Status.INTERNAL_SERVER_ERROR, 500);
    assert.strictEqual(Status.CONTINUE, 100);
    assert.strictEqual(Status.MOVED_PERMANENTLY, 301);
    assert.strictEqual(Status.TOO_MANY_REQUESTS, 429);
    assert.strictEqual(Status.SERVICE_UNAVAILABLE, 503);
  });
});

describe("reasonPhrase", () => {
  it("returns correct phrase for known codes", () => {
    assert.strictEqual(reasonPhrase(200), "OK");
    assert.strictEqual(reasonPhrase(404), "Not Found");
    assert.strictEqual(reasonPhrase(500), "Internal Server Error");
    assert.strictEqual(reasonPhrase(201), "Created");
    assert.strictEqual(reasonPhrase(301), "Moved Permanently");
    assert.strictEqual(reasonPhrase(429), "Too Many Requests");
  });

  it("returns Unknown Status for unrecognized codes", () => {
    assert.strictEqual(reasonPhrase(999), "Unknown Status");
    assert.strictEqual(reasonPhrase(0), "Unknown Status");
  });
});

describe("classification guards", () => {
  it("isInformational detects 1xx", () => {
    assert.strictEqual(isInformational(100), true);
    assert.strictEqual(isInformational(101), true);
    assert.strictEqual(isInformational(199), true);
    assert.strictEqual(isInformational(200), false);
    assert.strictEqual(isInformational(99), false);
  });

  it("isSuccess detects 2xx", () => {
    assert.strictEqual(isSuccess(200), true);
    assert.strictEqual(isSuccess(204), true);
    assert.strictEqual(isSuccess(299), true);
    assert.strictEqual(isSuccess(300), false);
    assert.strictEqual(isSuccess(199), false);
  });

  it("isRedirect detects 3xx", () => {
    assert.strictEqual(isRedirect(301), true);
    assert.strictEqual(isRedirect(307), true);
    assert.strictEqual(isRedirect(399), true);
    assert.strictEqual(isRedirect(400), false);
    assert.strictEqual(isRedirect(299), false);
  });

  it("isClientError detects 4xx", () => {
    assert.strictEqual(isClientError(400), true);
    assert.strictEqual(isClientError(404), true);
    assert.strictEqual(isClientError(499), true);
    assert.strictEqual(isClientError(500), false);
    assert.strictEqual(isClientError(399), false);
  });

  it("isServerError detects 5xx", () => {
    assert.strictEqual(isServerError(500), true);
    assert.strictEqual(isServerError(503), true);
    assert.strictEqual(isServerError(599), true);
    assert.strictEqual(isServerError(600), false);
    assert.strictEqual(isServerError(499), false);
  });
});

describe("statusRange", () => {
  it("returns correct range strings", () => {
    assert.strictEqual(statusRange(100), "1xx");
    assert.strictEqual(statusRange(200), "2xx");
    assert.strictEqual(statusRange(301), "3xx");
    assert.strictEqual(statusRange(404), "4xx");
    assert.strictEqual(statusRange(500), "5xx");
  });

  it("throws for out-of-range codes", () => {
    assert.throws(() => statusRange(99), RangeError);
    assert.throws(() => statusRange(600), RangeError);
  });
});

describe("isRetryable", () => {
  it("returns true for retryable codes", () => {
    assert.strictEqual(isRetryable(408), true);
    assert.strictEqual(isRetryable(429), true);
    assert.strictEqual(isRetryable(500), true);
    assert.strictEqual(isRetryable(502), true);
    assert.strictEqual(isRetryable(503), true);
    assert.strictEqual(isRetryable(504), true);
  });

  it("returns false for non-retryable codes", () => {
    assert.strictEqual(isRetryable(200), false);
    assert.strictEqual(isRetryable(400), false);
    assert.strictEqual(isRetryable(401), false);
    assert.strictEqual(isRetryable(404), false);
    assert.strictEqual(isRetryable(501), false);
  });
});
