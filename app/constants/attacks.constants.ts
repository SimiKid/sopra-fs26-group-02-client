export enum AttackId {
  FIREBALL = "FIREBALL",
  INFERNO = "INFERNO",
  LIGHTNING = "LIGHTNING",
  TSUNAMI = "TSUNAMI",
  TORNADO = "TORNADO",
  PUNCH = "PUNCH",
  ICE_SPIKES = "ICE_SPIKES",
  BLIZZARD = "BLIZZARD",
}

export interface AttackConfig {
  id: AttackId;
  title: string;
  image: string;
  baseDamage: number;
  element: string;
  description: string;
}

export const ATTACKS: AttackConfig[] = [
  {
    id: AttackId.FIREBALL,
    title: "Fireball",
    image: "/images/attacks/fireball.png",
    baseDamage: 100,
    element: "Fire",
    description: "A blazing projectile that scorches enemies on impact.",
  },
  {
    id: AttackId.INFERNO,
    title: "Inferno",
    image: "/images/attacks/inferno.png",
    baseDamage: 100,
    element: "Fire",
    description: "Unleashes a raging inferno that engulfs everything in flames.",
  },
  {
    id: AttackId.LIGHTNING,
    title: "Lightning",
    image: "/images/attacks/lightning.png",
    baseDamage: 100,
    element: "Electric",
    description: "A lightning strike that hits instantly with electrifying force.",
  },
  {
    id: AttackId.TSUNAMI,
    title: "Tsunami",
    image: "/images/attacks/tsunami.png",
    baseDamage: 100,
    element: "Water",
    description: "A massive wave crashes over opponents, overwhelming them.",
  },
  {
    id: AttackId.TORNADO,
    title: "Tornado",
    image: "/images/attacks/tornado.png",
    baseDamage: 100,
    element: "Wind",
    description: "A violent whirlwind that lifts and tosses enemies around.",
  },
  {
    id: AttackId.PUNCH,
    title: "Punch",
    image: "/images/attacks/punch.png",
    baseDamage: 100,
    element: "Physical",
    description: "A quick and reliable strike when magic isn’t enough.",
  },
  {
    id: AttackId.ICE_SPIKES,
    title: "Ice Spikes",
    image: "/images/attacks/ice_spikes.png",
    baseDamage: 100,
    element: "Ice",
    description: "Sharp spikes of ice erupt from the ground beneath the enemy.",
  },
  {
    id: AttackId.BLIZZARD,
    title: "Blizzard",
    image: "/images/attacks/blizzard.png",
    baseDamage: 100,
    element: "Ice",
    description: "A freezing storm that batters enemies with snow and ice.",
  },
];