import {
  MultiProductValidationResult,
  ProductValidationResult,
} from "./multiProductValidationTypes";

import {
  RuntimeProduct,
} from "../runtime/runtimeTypes";

export class MultiProductValidator {

  validate(

    products: {

      url: string;

      extracted: RuntimeProduct;

    }[],

  ): MultiProductValidationResult {

    const fieldSuccess:
      Record<string, number> = {};

    const results:
      ProductValidationResult[] = [];

    let successfulProducts = 0;

    for (
      const product
      of products
    ) {

      const missingFields:
        string[] = [];

      for (
        const [
          field,
          value,
        ]
        of Object.entries(
          product.extracted
        )
      ) {

        const hasValue =

          Array.isArray(value)
            ? value.length > 0
            : value !== null &&
              value !== "";

        if (
          hasValue
        ) {

          fieldSuccess[field] =

            (fieldSuccess[field] ?? 0) + 1;

        }
        else {

          missingFields.push(
            field
          );

        }

      }

      const success =
        missingFields.length === 0;

      if (
        success
      ) {

        successfulProducts++;

      }

      results.push({

        url:
          product.url,

        success,

        extracted:
          product.extracted,

        missingFields,

      });

    }

    return {

      totalProducts:
        products.length,

      successfulProducts,

      failedProducts:
        products.length -
        successfulProducts,

      successRate:

        products.length === 0
          ? 0
          : Number(

              (
                successfulProducts /
                products.length *
                100

              ).toFixed(2)

            ),

      fieldSuccess,

      results,

    };

  }

}