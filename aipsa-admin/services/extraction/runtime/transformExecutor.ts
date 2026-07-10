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
        this.cleanString(
          values.productName
        ),

      brand:
        this.cleanString(
          values.brand
        ),

      productIdentifier:
        this.cleanString(
          values.productIdentifier
        ),

      currentPrice:
        this.cleanString(
          values.currentPrice
        ),

      originalPrice:
        this.cleanString(
          values.originalPrice
        ),

      currency:
        this.cleanString(
          values.currency
        ),

      primaryImage:
        this.cleanString(
          values.primaryImage
        ),

      additionalImages:
        this.cleanArray(
          values.additionalImages
        ),

      sizes:
        this.cleanArray(
          values.sizes
        ),

      colours:
        this.cleanArray(
          values.colours
        ),

      stockAvailability:
        this.cleanString(
          values.stockAvailability
        ),

    };

  }

  private cleanString(
    value:
      | string
      | string[]
      | null
      | undefined
  ): string | null {

    if (
      typeof value !==
      "string"
    ) {

      return null;

    }

    const cleaned =
      value
        .trim()
        .replace(
          /\s+/g,
          " "
        );

    return cleaned.length > 0
      ? cleaned
      : null;

  }

  private cleanArray(
    value:
      | string
      | string[]
      | null
      | undefined
  ): string[] {

    if (
      !Array.isArray(
        value
      )
    ) {

      return [];

    }

    return [
      ...new Set(
        value
          .map(
            item =>
              item
                .trim()
                .replace(
                  /\s+/g,
                  " "
                )
          )
          .filter(
            item =>
              item.length > 0
          )
      ),
    ];

  }

}