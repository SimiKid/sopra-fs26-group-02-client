import { WIZARDS } from "@/constants/wizards.constants";
import type {
  Rain,
  Temperature,
  WizardClass,
} from "@/types/history";

export function formatWizardClass(id: WizardClass | null): string {
  if (!id) return "No wizard";
  return WIZARDS.find((w) => w.id === id)?.title ?? id;
}

const TEMPERATURE_LABEL: Record<Temperature, string> = {
  HOT: "Hot",
  NEUTRAL: "Mild",
  COLD: "Cold",
};

const RAIN_LABEL: Record<Rain, string> = {
  RAINING: "Raining",
  CLEAR: "Clear",
};

export function formatWeather(
  temperature: Temperature | null,
  rain: Rain | null,
): string {
  const t = temperature ? TEMPERATURE_LABEL[temperature] : null;
  const r = rain ? RAIN_LABEL[rain] : null;
  if (t && r) return `${t} & ${r}`;
  return t ?? r ?? "Unknown weather";
}

// Backend sends "2026-04-05T12:00:00" (no timezone). `new Date()` interprets
// this as local time, which is the intended behavior per the API contract.
export function formatGameDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
