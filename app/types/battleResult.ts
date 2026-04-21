export type BattleResult = {
  winnerUserId: number;
  loserUserId: number;
  totalDamageDealt: number;
  turnsPlayed: number;
  weather: {
    rainCategory: string;
    temperatureCategory: string;
  };
};