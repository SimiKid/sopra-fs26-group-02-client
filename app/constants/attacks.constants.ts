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