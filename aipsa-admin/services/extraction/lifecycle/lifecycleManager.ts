import {
  LifecycleDecision,
} from "./lifecycleTypes";

export class LifecycleManager {

  activate(
    retailerId: string,
    category: string,
    version: number
  ): LifecycleDecision {

    return {

      retailerId,

      category,

      version,

      state: "ACTIVE",

      reason:
        "Blueprint activated.",

    };

  }

  retire(
    retailerId: string,
    category: string,
    version: number
  ): LifecycleDecision {

    return {

      retailerId,

      category,

      version,

      state: "RETIRED",

      reason:
        "Blueprint retired.",

    };

  }

}