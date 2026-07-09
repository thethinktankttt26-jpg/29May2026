import {
  ExtractionRule,
} from "../contracts/extractionConfigV1";

export interface CompiledStage {

  source:
    | "JSON_LD"
    | "META"
    | "CSS";

  fields: Record<
    string,
    ExtractionRule
  >;

}

export interface CompiledBlueprint {

  stages: CompiledStage[];

}