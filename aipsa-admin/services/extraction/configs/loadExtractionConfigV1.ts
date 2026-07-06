import { readFile } from "fs/promises";

import {
  EXTRACTION_CONFIG_CONTRACT_VERSION,
  ExtractionConfigV1,
  ExtractionSource,
  ExtractionTransform,
} from "../contracts/extractionConfigV1";

const FIELD_NAMES = [
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
] as const;

const VALID_SOURCES: ExtractionSource[] = [
  "CSS",
  "META",
  "JSON_LD",
];

const VALID_TRANSFORMS: ExtractionTransform[] = [
  "TRIM",
  "NORMALIZE_WHITESPACE",
  "PARSE_PRICE",
  "PARSE_CURRENCY",
  "NORMALIZE_URL",
  "DEDUPLICATE",
];

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function validateRule(
  fieldName: string,
  value: unknown
): void {
  if (!isRecord(value)) {
    throw new Error(
      `${fieldName}: extraction rule must be an object.`
    );
  }

  if (
    typeof value.source !== "string" ||
    !VALID_SOURCES.includes(
      value.source as ExtractionSource
    )
  ) {
    throw new Error(
      `${fieldName}: invalid extraction source.`
    );
  }

  if (!Array.isArray(value.selectors)) {
    throw new Error(
      `${fieldName}: selectors must be an array.`
    );
  }

  if (value.selectors.length === 0) {
    throw new Error(
      `${fieldName}: at least one selector is required.`
    );
  }

  for (const selector of value.selectors) {
    if (
      !isRecord(selector) ||
      typeof selector.selector !== "string" ||
      selector.selector.trim().length === 0
    ) {
      throw new Error(
        `${fieldName}: invalid selector.`
      );
    }

    if (
      selector.attribute !== undefined &&
      typeof selector.attribute !== "string"
    ) {
      throw new Error(
        `${fieldName}: selector attribute must be a string.`
      );
    }
  }

  if (typeof value.multiple !== "boolean") {
    throw new Error(
      `${fieldName}: multiple must be boolean.`
    );
  }

  if (!Array.isArray(value.transforms)) {
    throw new Error(
      `${fieldName}: transforms must be an array.`
    );
  }

  for (const transform of value.transforms) {
    if (
      typeof transform !== "string" ||
      !VALID_TRANSFORMS.includes(
        transform as ExtractionTransform
      )
    ) {
      throw new Error(
        `${fieldName}: invalid transform ${String(transform)}.`
      );
    }
  }

  if (typeof value.required !== "boolean") {
    throw new Error(
      `${fieldName}: required must be boolean.`
    );
  }

  if (value.jsonLdFilter !== undefined) {
    if (!isRecord(value.jsonLdFilter)) {
      throw new Error(
        `${fieldName}: jsonLdFilter must be an object.`
      );
    }

    if (
      typeof value.jsonLdFilter.path !== "string" ||
      value.jsonLdFilter.path.trim().length === 0 ||
      typeof value.jsonLdFilter.equals !== "string"
    ) {
      throw new Error(
        `${fieldName}: invalid jsonLdFilter.`
      );
    }

    if (value.source !== "JSON_LD") {
      throw new Error(
        `${fieldName}: jsonLdFilter is only valid for JSON_LD rules.`
      );
    }
  }
}

export function validateExtractionConfigV1(
  value: unknown
): asserts value is ExtractionConfigV1 {
  if (!isRecord(value)) {
    throw new Error(
      "Extraction config must be an object."
    );
  }

  if (
    value.contractVersion !==
    EXTRACTION_CONFIG_CONTRACT_VERSION
  ) {
    throw new Error(
      "Unsupported extraction contract version."
    );
  }

  if (!isRecord(value.configScope)) {
    throw new Error(
      "configScope must be an object."
    );
  }

  if (
    value.configScope.type !== "SHARED" &&
    value.configScope.type !== "CATEGORY"
  ) {
    throw new Error(
      "Invalid configScope type."
    );
  }

  if (
    value.configScope.type === "CATEGORY" &&
    (
      typeof value.configScope.category !== "string" ||
      value.configScope.category.trim().length === 0
    )
  ) {
    throw new Error(
      "CATEGORY configScope requires category."
    );
  }

  if (!isRecord(value.fields)) {
    throw new Error(
      "fields must be an object."
    );
  }

  for (const fieldName of FIELD_NAMES) {
    if (!(fieldName in value.fields)) {
      throw new Error(
        `Missing extraction field: ${fieldName}.`
      );
    }

    validateRule(
      fieldName,
      value.fields[fieldName]
    );
  }
}

export async function loadExtractionConfigV1(
  filePath: string
): Promise<ExtractionConfigV1> {
  const text = await readFile(
    filePath,
    "utf8"
  );

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid JSON in extraction config: ${filePath}`
    );
  }

  validateExtractionConfigV1(parsed);

  return parsed;
}
