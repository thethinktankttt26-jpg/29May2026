import {
  evaluateActivation,
} from "./activationRules";

import {
  LifecycleManager,
} from "./lifecycleManager";

import {
  RollbackEngine,
} from "./rollbackEngine";

async function main() {

  const activation =
    evaluateActivation({

      approved: true,

      healthScore: 95,

      confidence: 0.96,

    });

  console.log(
    "ACTIVATION:",
    activation
  );

  if (!activation.allowed) {

    throw new Error(
      "Expected activation to be allowed."
    );

  }

  const lifecycle =
    new LifecycleManager();

  const active =
    lifecycle.activate(

      "nike",

      "Footwear",

      4,

    );

  console.log();

  console.log(
    "LIFECYCLE:",
    active
  );

  const rollback =
    new RollbackEngine();

  const decision =
    rollback.rollback(4);

  console.log();

  console.log(
    "ROLLBACK:",
    decision
  );

  if (
    decision.toVersion !== 3
  ) {

    throw new Error(
      "Rollback failed."
    );

  }

  console.log();

  console.log(
    "LIFECYCLE TEST PASSED"
  );

}

main();