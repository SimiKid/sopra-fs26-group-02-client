// Represents a single player in a game session
export interface Player {
  id: number;
  username: string;
}

// Represents the full game session returned by the backend
// gameCode: the 6-character code shared with the opponent
// status: current game state, e.g. "WAITING", "CONFIGURING", "IN_PROGRESS"
// players: list of players currently in the session (1 while waiting, 2 once opponent joins)
export interface GameSession {
  gameCode: string;
  status: string;
  players: Player[];
}