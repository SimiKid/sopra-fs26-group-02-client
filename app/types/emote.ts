export type EmoteKey = "EMOTE_1" | "EMOTE_2" | "EMOTE_3" | "EMOTE_4";

export interface ReceivedEmote {
  key: EmoteKey;
  id: number;
}