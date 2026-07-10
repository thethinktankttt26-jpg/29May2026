export interface RollbackDecision {

  fromVersion: number;

  toVersion: number;

  reason: string;

}