import {
  CompiledStage,
} from "./runtimeCompilerTypes";

import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

export class JsonLdExecutor {

  execute(
    stage: CompiledStage,
    _html: string
  ): RuntimeExtractionResult {

    const values:
      Record<
        string,
        string | string[] | null
      > = {};

    for (
      const field
      of Object.keys(
        stage.fields
      )
    ) {

      values[field] = null;

    }

    return {

      values,

    };

  }

}