import * as cheerio from "cheerio";

import {
  ExtractionConfigV1,
  ExtractionFields,
} from "../contracts/extractionConfigV1";

import {
  ExtractionFieldName,
  ExtractionFieldResults,
  ExtractionRunResult,
} from "./extractionRunnerTypes";

import {
  extractRule,
} from "./extractRule";

const EXTRACTION_FIELD_NAMES: ExtractionFieldName[] = [
  "productName",
  "brand",
  "productIdentifier",
  "currentPrice",
  "originalPrice",
  "currency",
  "primaryImage",
  "additionalImages",
  "sizes",
  "colours",
  "stockAvailability",
];

export function runExtraction(
  html: string,
  config: ExtractionConfigV1
): ExtractionRunResult {
  const $ = cheerio.load(html);

  const fields =
    {} as ExtractionFieldResults;

  const errors: string[] = [];

  for (const fieldName of EXTRACTION_FIELD_NAMES) {
    const rule: ExtractionFields[typeof fieldName] =
      config.fields[fieldName];

    const result = extractRule($, rule);

    fields[fieldName] = result;

    if (!result.success) {
      errors.push(
        `${fieldName}: ${result.error ?? "Extraction failed."}`
      );
    }
  }

  return {
    success: errors.length === 0,
    fields,
    errors,
  };
}
