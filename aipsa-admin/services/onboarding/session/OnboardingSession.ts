export type OnboardingStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED";

export interface OnboardingSession {

  retailerId: string;

  status: OnboardingStatus;

  startedAt: Date;

  completedAt: Date | null;

}