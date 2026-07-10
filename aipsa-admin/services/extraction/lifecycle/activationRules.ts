export interface ActivationContext {

  approved: boolean;

  healthScore: number;

  confidence: number;

}

export interface ActivationDecision {

  allowed: boolean;

  reason: string;

}

export function evaluateActivation(
  context: ActivationContext
): ActivationDecision {

  if (!context.approved) {

    return {

      allowed: false,

      reason:
        "Blueprint has not been approved.",

    };

  }

  if (context.healthScore < 90) {

    return {

      allowed: false,

      reason:
        "Health score is below activation threshold.",

    };

  }

  if (context.confidence < 0.90) {

    return {

      allowed: false,

      reason:
        "AI confidence is below activation threshold.",

    };

  }

  return {

    allowed: true,

    reason:
      "Blueprint meets activation requirements.",

  };

}