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

export const ATTACK_IMAGES: Record<AttackId, string> = {
  [AttackId.FIREBALL]: "/images/attacks/fireball.png",
  [AttackId.INFERNO]: "/images/attacks/inferno.png",
  [AttackId.LIGHTNING]: "/images/attacks/lightning.png",
  [AttackId.TSUNAMI]: "/images/attacks/tsunami.png",
  [AttackId.TORNADO]: "/images/attacks/tornado.png",
  [AttackId.PUNCH]: "/images/attacks/punch.png",
  [AttackId.ICE_SPIKES]: "/images/attacks/ice_spikes.png",
  [AttackId.BLIZZARD]: "/images/attacks/blizzard.png",
};

export const ATTACK_GRADIENTS: Record<AttackId, string> = {
  [AttackId.FIREBALL]: "linear-gradient(135deg, #ff7a00 0%, #ffb347 100%)",
  [AttackId.INFERNO]: "linear-gradient(135deg, #b91c1c 0%, #ff5722 100%)",
  [AttackId.LIGHTNING]: "linear-gradient(135deg, #1e40af 0%, #60a5fa 100%)",
  [AttackId.TSUNAMI]: "linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)",
  [AttackId.TORNADO]: "linear-gradient(135deg, #475569 0%, #94a3b8 100%)",
  [AttackId.PUNCH]: "linear-gradient(135deg, #57534e 0%, #a8a29e 100%)",
  [AttackId.ICE_SPIKES]: "linear-gradient(135deg, #0369a1 0%, #bae6fd 100%)",
  [AttackId.BLIZZARD]: "linear-gradient(135deg, #0284c7 0%, #7dd3fc 100%)",
};