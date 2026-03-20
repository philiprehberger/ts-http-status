export function isInformational(status: number): boolean {
  return status >= 100 && status <= 199;
}

export function isSuccess(status: number): boolean {
  return status >= 200 && status <= 299;
}

export function isRedirect(status: number): boolean {
  return status >= 300 && status <= 399;
}

export function isClientError(status: number): boolean {
  return status >= 400 && status <= 499;
}

export function isServerError(status: number): boolean {
  return status >= 500 && status <= 599;
}

export function statusRange(
  status: number,
): "1xx" | "2xx" | "3xx" | "4xx" | "5xx" {
  if (status >= 100 && status <= 199) return "1xx";
  if (status >= 200 && status <= 299) return "2xx";
  if (status >= 300 && status <= 399) return "3xx";
  if (status >= 400 && status <= 499) return "4xx";
  if (status >= 500 && status <= 599) return "5xx";
  throw new RangeError(`Status code ${status} is not in a valid HTTP range`);
}
