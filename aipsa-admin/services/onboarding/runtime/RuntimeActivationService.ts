import { randomUUID } from "crypto";

import { RuntimeConfiguration } from "./RuntimeConfiguration";
import { RuntimeSession } from "./RuntimeSession";
import { RuntimeValidationService } from "./RuntimeValidationService";

export class RuntimeActivationService {

  private readonly validator =
    new RuntimeValidationService();

  activate(
    runtime: RuntimeConfiguration
  ): RuntimeSession {

    const validation =
      this.validator.validate(runtime);

    if (!validation.valid) {
      throw new Error(
        `Runtime activation failed:\n${validation.errors.join("\n")}`
      );
    }

    runtime.status = "VALIDATED";

    return {

      id: randomUUID(),

      runtime: {
        ...runtime,
        status: "ACTIVE",
      },

      activatedAt: new Date(),

      active: true,

    };

  }

}