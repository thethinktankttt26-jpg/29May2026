import {
  RuntimeExtractionResult,
} from "./runtimeExecutionTypes";

import {
  RuntimeProduct,
} from "./runtimeTypes";

export class TransformExecutor {

  execute(
    extraction: RuntimeExtractionResult
  ): RuntimeProduct {

    const values =
      extraction.values;

    return {

      productName:
        values.productName as string | null ?? null,

      brand:
        values.brand as string | null ?? null,

      productIdentifier:
        values.productIdentifier as string | null ?? null,

      currentPrice:
        values.currentPrice as string | null ?? null,

      originalPrice:
        values.originalPrice as string | null ?? null,

      currency:
        values.currency as string | null ?? null,

      primaryImage:
        values.primaryImage as string | null ?? null,

      additionalImages:
        (values.additionalImages as string[]) ?? [],

      sizes:
        (values.sizes as string[]) ?? [],

      colours:
        (values.colours as string[]) ?? [],

      stockAvailability:
        values.stockAvailability as string | null ?? null,

    };

  }

}