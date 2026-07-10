export type BlueprintLifecycleState =
  | "DRAFT"
  | "REVIEW"
  | "ACTIVE"
  | "RETIRED";

export interface LifecycleDecision {

  retailerId: string;

  category: string;

  version: number;

  state: BlueprintLifecycleState;

  reason: string;

}