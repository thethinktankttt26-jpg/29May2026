import {
  CompiledStage,
} from "./runtimeCompilerTypes";

import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

import {
  RuntimeContextBuilder,
} from "./runtimeContextBuilder";

export class MetaExecutor {

  private readonly contextBuilder =
    new RuntimeContextBuilder();

  execute(
    stage: CompiledStage,
    html: string
  ): RuntimeExtractionResult {

    const context =
      this.contextBuilder.build(
        html
      );

    const values:
      Record<
        string,
        string | string[] | null
      > = {};

    for (
      const [
        fieldName,
        compiledField,
      ]
      of Object.entries(
        stage.fields
      )
    ) {

      let value:
        string | string[] | null =
        null;

      if (
        compiledField.source ===
        "META"
      ) {

        const selector =
          compiledField.selectors[0]
            ?.selector;

        if (
          selector
        ) {

          value =
            context.metaTags.get(
              selector
            ) ?? null;

        }

      }

      values[fieldName] =
        value;

    }

    return {

      values,

    };

  }

}