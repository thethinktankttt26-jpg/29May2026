import {
  CompiledBlueprint,
  CompiledStage,
} from "./runtimeCompilerTypes";

import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

import {
  RuntimeProduct,
} from "./runtimeTypes";

import {
  JsonLdExecutor,
} from "./jsonLdExecutor";

import {
  MetaExecutor,
} from "./metaExecutor";

import {
  CssExecutor,
} from "./cssExecutor";

import {
  TransformExecutor,
} from "./transformExecutor";

export class RuntimeExecutor {

  private readonly jsonLdExecutor =
    new JsonLdExecutor();

  private readonly metaExecutor =
    new MetaExecutor();

  private readonly cssExecutor =
    new CssExecutor();

  private readonly transformExecutor =
    new TransformExecutor();

  execute(
    blueprint: CompiledBlueprint,
    html: string
  ): RuntimeProduct {

    const mergedValues:
      RuntimeExtractionResult["values"] =
      {};

    for (
      const stage
      of blueprint.stages
    ) {

      const result =
        this.executeStage(
          stage,
          html
        );

      Object.assign(

        mergedValues,

        result.values,

      );

    }

    return this.transformExecutor.execute({

      values:
        mergedValues,

    });

  }

  private executeStage(
    stage: CompiledStage,
    html: string
  ): RuntimeExtractionResult {

    switch (
      stage.source
    ) {

      case "JSON_LD":

        return this.jsonLdExecutor.execute(

          stage,

          html,

        );

      case "META":

        return this.metaExecutor.execute(

          stage,

          html,

        );

      case "CSS":

        return this.cssExecutor.execute(

          stage,

          html,

        );

    }

  }

}