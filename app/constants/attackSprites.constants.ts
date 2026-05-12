import { AttackId } from "./attacks.constants";

export interface AttackSprite {
  id: AttackId;
  title: string;
  spriteSheet: string;
  spriteWidth: number;
  spriteHeight: number;
  frames: number;
  animation_speed: number;
  scale?: number;
  yOffset?: number;
}

export const ATTACK_SPRITES: Record<AttackId, AttackSprite> = {
  [AttackId.FIREBALL]: {
    id: AttackId.FIREBALL,
    title: "Fireball",
    spriteSheet: "/images/attacks/fireball_sheet.png",
    spriteWidth: 64,
    spriteHeight: 64,
    frames: 15,
    animation_speed: 120,
    scale: 9,
    yOffset: 65,
  },
  [AttackId.INFERNO]: {
    id: AttackId.INFERNO,
    title: "Inferno",
    spriteSheet: "/images/attacks/inferno_sheet.png",
    spriteWidth: 256,
    spriteHeight: 166,
    frames: 9,
    animation_speed: 120,
    scale: 4,
    yOffset: -60,
  },
  [AttackId.LIGHTNING]: {
    id: AttackId.LIGHTNING,
    title: "Lightning",
    spriteSheet: "/images/attacks/lightning_sheet.png",
    spriteWidth: 96,
    spriteHeight: 144,
    frames: 11,
    animation_speed: 120,
    scale: 4,
    yOffset: -75,
  },
  [AttackId.TSUNAMI]: {
    id: AttackId.TSUNAMI,
    title: "Tsunami",
    spriteSheet: "/images/attacks/tsunami_sheet.png",
    spriteWidth: 88,
    spriteHeight: 64,
    frames: 11,
    animation_speed: 150,
    scale: 12,
    yOffset: 50,
  },
  [AttackId.TORNADO]: {
    id: AttackId.TORNADO,
    title: "Tornado",
    spriteSheet: "/images/attacks/tornado_sheet.png",
    spriteWidth: 128,
    spriteHeight: 143,
    frames: 18,
    animation_speed: 120,
    scale: 5,
    yOffset: -35,
  },
  [AttackId.PUNCH]: {
    id: AttackId.PUNCH,
    title: "Punch",
    spriteSheet: "/images/attacks/punch_sheet.png",
    spriteWidth: 32,
    spriteHeight: 32,
    frames: 6,
    animation_speed: 120,
    scale: 7,
  },
  [AttackId.ICE_SPIKES]: {
    id: AttackId.ICE_SPIKES,
    title: "Ice Spikes",
    spriteSheet: "/images/attacks/ice_spikes_sheet.png",
    spriteWidth: 48,
    spriteHeight: 64,
    frames: 17,
    animation_speed: 120,
    scale: 10,
    yOffset: -110,
  },
  [AttackId.BLIZZARD]: {
    id: AttackId.BLIZZARD,
    title: "Blizzard",
    spriteSheet: "/images/attacks/blizzard_sheet.png",
    spriteWidth: 80,
    spriteHeight: 96,
    frames: 22,
    animation_speed: 120,
    scale: 7,
    yOffset: 35,
  },
};