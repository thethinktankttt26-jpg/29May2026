import {
  MultiProductValidator,
} from "./multiProductValidator";

import {
  RuntimeProduct,
} from "../runtime/runtimeTypes";

function createProduct(
  overrides: Partial<RuntimeProduct> = {}
): RuntimeProduct {

  return {

    productName: "Crew Neck T-Shirt",

    brand: "NEXT",

    productIdentifier: "12345",

    currentPrice: "25.00",

    originalPrice: "35.00",

    currency: "GBP",

    primaryImage:
      "https://example.com/image.jpg",

    additionalImages: [
      "https://example.com/image2.jpg",
    ],

    sizes: [
      "S",
      "M",
      "L",
    ],

    colours: [
      "Blue",
    ],

    stockAvailability:
      "InStock",

    ...overrides,

  };

}

const validator =
  new MultiProductValidator();

const report =
  validator.validate([

    {

      url:
        "https://next.co.uk/product1",

      extracted:
        createProduct(),

    },

    {

      url:
        "https://next.co.uk/product2",

      extracted:
        createProduct({

          originalPrice: null,

        }),

    },

    {

      url:
        "https://next.co.uk/product3",

      extracted:
        createProduct({

          sizes: [],

          colours: [],

        }),

    },

  ]);

console.log();

console.log(
  "Products:",
  report.totalProducts
);

console.log(
  "Success:",
  report.successfulProducts
);

console.log(
  "Failed:",
  report.failedProducts
);

console.log(
  "Success Rate:",
  report.successRate + "%"
);

console.log();

console.log(
  "Field Success:"
);

console.table(
  report.fieldSuccess
);

console.log();

console.log(
  "MULTI PRODUCT VALIDATION PASSED"
);