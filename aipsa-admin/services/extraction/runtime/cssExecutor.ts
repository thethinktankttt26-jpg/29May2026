import {
  CompiledStage,
} from "./runtimeCompilerTypes";

import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

import {
  RuntimeContextBuilder,
} from "./runtimeContextBuilder";

export class CssExecutor {

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
        "CSS"
      ) {

        if (
          compiledField.multiple
        ) {

          value =
            this.extractMultiple(
              context.dom,
              compiledField
            );

        } else {

          value =
            this.extractSingle(
              context.dom,
              compiledField
            );

        }

      }

      values[fieldName] =
        value;

    }

    return {

      values,

    };

  }

  private extractSingle(
    dom: ReturnType<
      RuntimeContextBuilder["build"]
    >["dom"],
    rule: CompiledStage["fields"][string]
  ): string | null {

    for (
      const selector
      of rule.selectors
    ) {

      const element =
        dom(selector.selector)
          .first();

      if (
        element.length === 0
      ) {

        continue;

      }

      const value =
        selector.attribute
          ? element.attr(
              selector.attribute
            )
          : element.text();

      if (
        value &&
        value.trim().length > 0
      ) {

        return value.trim();

      }

    }

    return null;

  }

  private extractMultiple(
    dom: ReturnType<
      RuntimeContextBuilder["build"]
    >["dom"],
    rule: CompiledStage["fields"][string]
  ): string[] | null {

    const results:
      string[] = [];

    for (
      const selector
      of rule.selectors
    ) {

      dom(selector.selector)
        .each(
          (
            _,
            element
          ) => {

            const node =
              dom(element);

            const value =
              selector.attribute
                ? node.attr(
                    selector.attribute
                  )
                : node.text();

            if (
              value &&
              value.trim().length > 0
            ) {

              results.push(
                value.trim()
              );

            }

          }
        );

      if (
        results.length > 0
      ) {

        break;

      }

    }

    return results.length > 0
      ? [...new Set(results)]
      : null;

  }

}