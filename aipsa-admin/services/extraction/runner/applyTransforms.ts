import {
  ExtractionTransform,
} from "../contracts/extractionConfigV1";

export type TransformValue =
  | string
  | string[];

function applyStringTransform(
  value: string,
  transform: ExtractionTransform
): string {
  switch (transform) {
    case "TRIM":
      return value.trim();

    case "NORMALIZE_WHITESPACE":
      return value.replace(/\s+/g, " ").trim();

    case "PARSE_PRICE": {
      const normalized = value
        .replace(/,/g, "")
        .match(/-?\d+(?:\.\d+)?/);

      return normalized?.[0] ?? "";
    }

    case "PARSE_CURRENCY": {
      const upperValue = value.toUpperCase();

      if (upperValue.includes("GBP") || value.includes("£")) {
        return "GBP";
      }

      if (upperValue.includes("EUR") || value.includes("€")) {
        return "EUR";
      }

      if (upperValue.includes("USD") || value.includes("$")) {
        return "USD";
      }

      return upperValue.trim();
    }

    case "NORMALIZE_URL":
      return value.trim();

    case "DEDUPLICATE":
      return value;

    default:
      return value;
  }
}

export function applyTransforms(
  value: TransformValue,
  transforms: ExtractionTransform[]
): TransformValue {
  let currentValue: TransformValue = value;

  for (const transform of transforms) {
    if (transform === "DEDUPLICATE") {
      if (Array.isArray(currentValue)) {
        currentValue = [...new Set(currentValue)];
      }

      continue;
    }

    if (Array.isArray(currentValue)) {
      currentValue = currentValue.map((item) =>
        applyStringTransform(item, transform)
      );
    } else {
      currentValue = applyStringTransform(
        currentValue,
        transform
      );
    }
  }

  return currentValue;
}
