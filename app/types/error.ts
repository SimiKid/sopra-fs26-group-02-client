export interface ApplicationError extends Error {
  info: string;
  status: number;
  /** Raw `message` field from the backend error response, if present. */
  serverMessage?: string;
}
