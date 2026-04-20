export type BattleTemperature = "HOT" | "NEUTRAL" | "COLD" | null;
export type BattleRain = "CLEAR" | "RAINING" | null;
export type BattleElement = "FIRE" | "ICE" | "LIGHTNING" | "NEUTRAL";

const WEATHER_MODIFIER_TABLE = {
  FIRE: {
    temp: { COLD: 0.8, NEUTRAL: 1.0, HOT: 1.2 },
    rain: { RAINING: 0.8, CLEAR: 1.2 },
  },
  ICE: {
    temp: { COLD: 1.2, NEUTRAL: 1.0, HOT: 0.8 },
    rain: { RAINING: 1.2, CLEAR: 0.8 },
  },
  LIGHTNING: {
    temp: { COLD: 1.0, NEUTRAL: 1.0, HOT: 1.0 },
    rain: { RAINING: 1.4, CLEAR: 0.6 },
  },
  NEUTRAL: {
    temp: { COLD: 0.8, NEUTRAL: 1.4, HOT: 0.8 },
    rain: { RAINING: 1.0, CLEAR: 1.0 },
  },
} as const;

export function getElementModifier(
  element: BattleElement,
  temperature: BattleTemperature,
  rain: BattleRain,
): number {
  if (!temperature || !rain) return 1.0;

  return (
    WEATHER_MODIFIER_TABLE[element].temp[temperature] *
    WEATHER_MODIFIER_TABLE[element].rain[rain]
  );
}