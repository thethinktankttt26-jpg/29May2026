import {
  RuntimeBlueprintLoader,
} from "./runtimeBlueprintLoader";

import {
  RuntimeRequest,
  RuntimeResult,
} from "./runtimeTypes";

import {
  compileBlueprint,
} from "./runtimeCompiler";

import {
  RuntimeExecutor,
} from "./runtimeExecutor";

export class RuntimeEngine {

  constructor(

    private readonly loader:
      RuntimeBlueprintLoader,

    private readonly executor:
      RuntimeExecutor,

  ) {}

  async execute(
    request: RuntimeRequest
  ): Promise<RuntimeResult> {

    const blueprint =
      await this.loader.load(

        request.retailer,

        request.category,

      );

    const compiled =
      compileBlueprint(
        blueprint
      );

    const product =
      this.executor.execute(

        compiled,

        request.html,

      );

    return {

      blueprint,

      product,

    };

  }

}