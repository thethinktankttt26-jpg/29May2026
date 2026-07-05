import * as cheerio from "cheerio";

import {
  ExtractionRule,
} from "../contracts/extractionConfigV1";

import {
  ExtractionFieldResult,
  ExtractionFieldValue,
} from "./extractionRunnerTypes";

import {
  applyTransforms,
} from "./applyTransforms";

type CheerioRoot = ReturnType<typeof cheerio.load>;

function isUsableValue(
  value: string | string[]
): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => item.trim().length > 0);
  }

  return value.trim().length > 0;
}

function extractCssOrMeta(
  $: CheerioRoot,
  selector: string,
  attribute: string | undefined,
  multiple: boolean
): string | string[] {
  const elements = $(selector);

  if (multiple) {
    return elements
      .map((_, element) => {
        if (attribute) {
          return $(element).attr(attribute) ?? "";
        }

        return $(element).text();
      })
      .get()
      .filter((value) => value.trim().length > 0);
  }

  const firstElement = elements.first();

  if (firstElement.length === 0) {
    return "";
  }

  if (attribute) {
    return firstElement.attr(attribute) ?? "";
  }

  return firstElement.text();
}

function getValueByPath(
  value: unknown,
  path: string
): unknown {
  const parts = path
    .split(".")
    .filter((part) => part.length > 0);

  let current: unknown = value;

  for (const part of parts) {
    if (
      typeof current !== "object" ||
      current === null ||
      !(part in current)
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

function normalizeJsonLdValue(
  value: unknown,
  multiple: boolean
): string | string[] {
  if (Array.isArray(value)) {
    const values = value
      .filter(
        (item) =>
          typeof item === "string" ||
          typeof item === "number" ||
          typeof item === "boolean"
      )
      .map(String);

    return multiple
      ? values
      : values[0] ?? "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return multiple ? [String(value)] : String(value);
  }

  return multiple ? [] : "";
}

function extractJsonLd(
  $: CheerioRoot,
  selector: string,
  multiple: boolean,
  jsonLdFilter: ExtractionRule["jsonLdFilter"]
): string | string[] {
  const values: string[] = [];

  $('script[type="application/ld+json"]').each(
    (_, element) => {
      const jsonText = $(element).html();

      if (!jsonText) {
        return;
      }

      try {
        const parsed = JSON.parse(jsonText);

        const documents = Array.isArray(parsed)
          ? parsed
          : [parsed];

        for (const document of documents) {
          if (jsonLdFilter) {
            const filterValue = getValueByPath(
              document,
              jsonLdFilter.path
            );

            if (
              String(filterValue ?? "") !==
              jsonLdFilter.equals
            ) {
              continue;
            }
          }

          const extracted = getValueByPath(
            document,
            selector
          );

          const normalized = normalizeJsonLdValue(
            extracted,
            multiple
          );

          if (Array.isArray(normalized)) {
            values.push(...normalized);
          } else if (normalized.trim().length > 0) {
            values.push(normalized);
          }
        }
      } catch {
        // Ignore malformed JSON-LD blocks and continue
        // checking the remaining blocks.
      }
    }
  );

  return multiple ? values : values[0] ?? "";
}

export function extractRule(
  $: CheerioRoot,
  rule: ExtractionRule
): ExtractionFieldResult {
  for (const selectorConfig of rule.selectors) {
    const { selector, attribute } = selectorConfig;

    let rawValue: string | string[];

    if (rule.source === "JSON_LD") {
      rawValue = extractJsonLd(
        $,
        selector,
        rule.multiple,
        rule.jsonLdFilter
      );
    } else {
      rawValue = extractCssOrMeta(
        $,
        selector,
        attribute,
        rule.multiple
      );
    }

    if (!isUsableValue(rawValue)) {
      continue;
    }

    const transformedValue =
      applyTransforms(rawValue, rule.transforms);

    if (!isUsableValue(transformedValue)) {
      continue;
    }

    return {
      success: true,
      value: transformedValue as ExtractionFieldValue,
      matchedSelector: selector,
      error: null,
    };
  }

  return {
    success: !rule.required,
    value: rule.multiple ? [] : null,
    matchedSelector: null,
    error: rule.required
      ? "Required field could not be extracted."
      : null,
  };
}
