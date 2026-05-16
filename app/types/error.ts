export interface ApplicationError extends Error {
  info: string;
  status: number;
  /** Human-readable text from the backend error response (`detail`, or
   * `message` as a fallback), if present. */
  serverMessage?: string;
}
