export type ApprovalDecision =
  | "APPROVED"
  | "NEEDS_REVIEW"
  | "REJECTED";

export interface BlueprintApprovalResult {

  decision: ApprovalDecision;

  approved: boolean;

  message: string;

}