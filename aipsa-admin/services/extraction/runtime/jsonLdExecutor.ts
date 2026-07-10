import {
  CompiledStage,
} from "./runtimeCompilerTypes";

import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

import {
  RuntimeContextBuilder,
} from "./runtimeContextBuilder";

export class JsonLdExecutor {

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
"JSON_LD"
      ) {

        value =
          this.extractFromJsonLd(
            context.jsonLdDocuments,
            compiledField.selectors[0]
  ?.selector
          );

      }

      values[fieldName] =
        value;

    }

    return {

      values,

    };

  }

  private extractFromJsonLd(
    documents: unknown[],
    path?: string
  ): string | string[] | null {

    if (!path) {

      return null;

    }

    for (
      const document
      of documents
    ) {

      const value =
        this.readPath(
          document,
          path
        );

      if (
        value !== undefined &&
        value !== null
      ) {

        return Array.isArray(
          value
        )
          ? value.map(
              item =>
                String(item)
            )
          : String(value);

      }

    }

    return null;

  }

  private readPath(
    object: unknown,
    path: string
  ): unknown {

    let current =
      object as any;

    for (
      const part
      of path.split(".")
    ) {

      if (
        current == null
      ) {

        return undefined;

      }

      current =
        current[part];

    }

    return current;

  }

}