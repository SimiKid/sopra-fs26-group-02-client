import { AttackId } from "@/constants/attacks.constants";

export interface Attack {
  id: AttackId;
  name: string;
  baseDamage: number;
  element: string;
  description: string;
}