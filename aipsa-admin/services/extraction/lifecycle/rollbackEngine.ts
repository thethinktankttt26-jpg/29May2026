import {
  RollbackDecision,
} from "./rollbackTypes";

export class RollbackEngine {

  rollback(
    currentVersion: number
  ): RollbackDecision {

    return {

      fromVersion:
        currentVersion,

      toVersion:
        Math.max(
          currentVersion - 1,
          1
        ),

      reason:
        "Rollback to previous stable blueprint.",

    };

  }

}