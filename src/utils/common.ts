export const convertErrorResponseToString = (err: unknown) =>
  err instanceof Object && "message" in err && typeof err.message === "string"
    ? err.message
    : err?.toString() || "unknown message";
