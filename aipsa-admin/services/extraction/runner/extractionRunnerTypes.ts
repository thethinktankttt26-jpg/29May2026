import {
  ExtractionFields,
} from "../contracts/extractionConfigV1";

export type ExtractionFieldName =
  keyof ExtractionFields;

export type ExtractionFieldValue =
  | string
  | string[]
  | null;

export interface ExtractionFieldResult {
  success: boolean;

  value: ExtractionFieldValue;

  matchedSelector: string | null;

  error: string | null;
}

export type ExtractionFieldResults = {
  [FieldName in ExtractionFieldName]:
    ExtractionFieldResult;
};

export interface ExtractionRunResult {
  success: boolean;

  fields: ExtractionFieldResults;

  errors: string[];
}
