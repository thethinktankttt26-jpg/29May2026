import {
  applyTransforms,
} from "./applyTransforms";

function assertEqual(
  name: string,
  actual: unknown,
  expected: unknown
) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(
      `${name} FAILED: expected ${expectedJson}, received ${actualJson}`
    );
  }

  console.log(`${name}: PASS`);
}

assertEqual(
  "TRIM",
  applyTransforms("  Next T-Shirt  ", ["TRIM"]),
  "Next T-Shirt"
);

assertEqual(
  "NORMALIZE_WHITESPACE",
  applyTransforms(
    "Next   Essential\n  T-Shirt",
    ["NORMALIZE_WHITESPACE"]
  ),
  "Next Essential T-Shirt"
);

assertEqual(
  "PARSE_PRICE GBP",
  applyTransforms("£1,299.99", ["PARSE_PRICE"]),
  "1299.99"
);

assertEqual(
  "PARSE_CURRENCY SYMBOL",
  applyTransforms("£8.00", ["PARSE_CURRENCY"]),
  "GBP"
);

assertEqual(
  "PARSE_CURRENCY CODE",
  applyTransforms("gbp", ["PARSE_CURRENCY"]),
  "GBP"
);

assertEqual(
  "TRANSFORM ARRAY",
  applyTransforms(
    ["  S ", " M  ", "  L"],
    ["TRIM"]
  ),
  ["S", "M", "L"]
);

assertEqual(
  "DEDUPLICATE",
  applyTransforms(
    ["S", "M", "S", "L", "M"],
    ["DEDUPLICATE"]
  ),
  ["S", "M", "L"]
);

assertEqual(
  "TRANSFORM PIPELINE",
  applyTransforms(
    ["  S ", "M", "  S  "],
    ["TRIM", "DEDUPLICATE"]
  ),
  ["S", "M"]
);

console.log("ALL TRANSFORM TESTS PASSED");
