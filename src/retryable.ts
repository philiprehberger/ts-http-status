const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

export function isRetryable(status: number): boolean {
  return RETRYABLE.has(status);
}
