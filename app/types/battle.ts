import type { AttackId } from "@/constants/attacks.constants";
import type { Player } from "@/types/game";

export type ArenaType = "TOKYO" | "BALI";

// -- Wire types (match backend DTOs field-for-field) ----------------------

// Matches PlayerGetDTO.java. Returned by PUT /games/{gameCode}/wizards
// and PUT /games/{gameCode}/attacks. There is no GET for player state,
// so this is the only way to learn a player's wizardClass / attacks / hp.
export interface PlayerGetDTO {
  id: number;
  userId: number;
  wizardClass: string;
  attacks: string[];
  hp: number;
  ready: boolean;
}

// Matches BattleStateDTO.java. Broadcast on /topic/game/{gameCode}.
// The initial broadcast (sent when both players are ready) has
// damageDealt: 0 and attackUsed: null — treat as "battle start, no attack yet".
// Subsequent broadcasts carry the last resolved attack. activePlayerId is
// always whose turn is *next*.
export interface BattleStateDTO {
  activePlayerId: number;
  player1Hp: number;
  player2Hp: number;
  damageDealt: number;
  attackUsed: string | null;
  gameStatus: string;
  winnerId: number | null;

  player1UserId: number;
  player2UserId: number;
  player1Username: string;
  player2Username: string;
  player1WizardClass: string;
  player2WizardClass: string;

  location: string;
  rain: "CLEAR" | "RAINING" | null;
  temperature: "HOT" | "NEUTRAL" | "COLD" | null;
}

export interface AttackMessage {
  attackName: AttackId;
}

// -- Client-side derived types --------------------------------------------
// Not sent by the server. Built by merging the most recent PlayerGetDTO
// responses (captured from PUT calls) with each incoming BattleStateDTO.

export interface BattlePlayer extends Player {
  wizardClass: string;
  currentHp: number;
  // STUB: backend does not expose maxHp; derived client-side via WIZARD_MAX_HP.
  maxHp: number;
  attacks: string[];
}

export interface BattleGameSession {
  gameCode: string;
  gameStatus: string;
  // STUB: arena is not in any DTO yet; defaults to DEFAULT_ARENA.
  arena: ArenaType;
  activePlayerId: number;
  winnerId: number | null;
  // Ordered [player1, player2] to match backend's player1Hp/player2Hp.
  // STUB: ordering follows GameSession.players[0]/[1].
  players: [BattlePlayer, BattlePlayer];
  lastAction?: {
    attackerId: number;
    attackUsed: string;
    damageDealt: number;
  };
}

export interface WeatherDTO {
  rainCategory: "CLEAR" | "RAINING";
  temperatureCategory: "HOT" | "NEUTRAL" | "COLD";
}

export interface LocationDTO {
  city: string;
}
