import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

import {
  CompiledBlueprint,
  CompiledStage,
} from "./runtimeCompilerTypes";

export function compileBlueprint(
  config: ExtractionConfigV1
): CompiledBlueprint {

  const groups =
    new Map<
      string,
      Record<string, any>
    >();

  for (
    const [fieldName, rule]
    of Object.entries(
      config.fields
    )
  ) {

    if (
      !groups.has(
        rule.source
      )
    ) {

      groups.set(
        rule.source,
        {}
      );

    }

    groups.get(
      rule.source
    )![
      fieldName
    ] = rule;

  }

  const stages:
    CompiledStage[] = [];

  for (
    const [
      source,
      fields,
    ]
    of groups
  ) {

    stages.push({

      source:
        source as
          | "JSON_LD"
          | "META"
          | "CSS",

      fields,

    });

  }

  return {

    stages,

  };

}