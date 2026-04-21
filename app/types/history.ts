// Wire types for GET /users/me/games. The backend returns an array
// already sorted most-recent-first by gameDate — do not re-sort client-side.

export type GameResult = "WIN" | "LOSS" | "DRAW";

export type WizardClass =
  | "ATTACKWIZARD"
  | "TANKWIZARD"
  | "BALANCEDWIZARD"
  | "GAMBLERWIZARD";

export type Temperature = "HOT" | "NEUTRAL" | "COLD";
export type Rain = "RAINING" | "CLEAR";

// gameDate is an ISO-8601 local datetime string without timezone
// (LocalDateTime from the backend). Parse with `new Date(str)` — browsers
// treat TZ-less ISO strings as local time, which matches backend intent.
export interface GameHistoryEntry {
  gameDate: string;
  location: string | null;
  result: GameResult;
  myWizardClass: WizardClass | null;
  opponentWizardClass: WizardClass | null;
  temperature: Temperature | null;
  rain: Rain | null;
}
