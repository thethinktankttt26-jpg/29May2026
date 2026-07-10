import {
  RuntimeEngine,
} from "./runtimeEngine";

import {
  RuntimeExecutor,
} from "./runtimeExecutor";

import {
  RuntimeBlueprintLoader,
} from "./runtimeBlueprintLoader";

import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

const blueprint: ExtractionConfigV1 = {

  contractVersion: "1.0",

  configScope: {

    type: "CATEGORY",

    category: "Footwear",

  },

  fields: {

    productName: {

      source: "JSON_LD",

      selectors: [

        {
          selector: "name",
        },

      ],

      multiple: false,

      transforms: [],

      required: true,

    },

    brand: {

      source: "JSON_LD",

      selectors: [],

      multiple: false,

      transforms: [],

      required: true,

    },

    productIdentifier: {

      source: "JSON_LD",

      selectors: [],

      multiple: false,

      transforms: [],

      required: true,

    },

    currentPrice: {

      source: "JSON_LD",

      selectors: [

        {
          selector: "offers.price",
        },

      ],

      multiple: false,

      transforms: [],

      required: true,

    },

    originalPrice: {

      source: "JSON_LD",

      selectors: [],

      multiple: false,

      transforms: [],

      required: false,

    },

    currency: {

      source: "JSON_LD",

      selectors: [

        {
          selector: "offers.priceCurrency",
        },

      ],

      multiple: false,

      transforms: [],

      required: true,

    },

    primaryImage: {

      source: "JSON_LD",

      selectors: [

        {
          selector: "image",
        },

      ],

      multiple: false,

      transforms: [],

      required: true,

    },

    additionalImages: {

      source: "JSON_LD",

      selectors: [],

      multiple: true,

      transforms: [],

      required: false,

    },

    sizes: {

      source: "CSS",

      selectors: [

        {
          selector: ".size",
        },

      ],

      multiple: true,

      transforms: [],

      required: true,

    },

    colours: {

      source: "CSS",

      selectors: [],

      multiple: true,

      transforms: [],

      required: false,

    },

    stockAvailability: {

      source: "META",

      selectors: [

        {
          selector: "product:availability",
        },

      ],

      multiple: false,

      transforms: [],

      required: true,

    },

  },

};

class MockLoader
  implements RuntimeBlueprintLoader {

  async load(): Promise<ExtractionConfigV1> {

    return blueprint;

  }

}

const html = `
<html>

<head>

<meta
property="product:availability"
content="In Stock">

<script
type="application/ld+json">

{
"name":"Nike Air Max",

"offers":{

"price":"39.99",

"priceCurrency":"GBP"

},

"image":"https://example.com/image.jpg"

}

</script>

</head>

<body>

<div class="size">
M
</div>

<div class="size">
L
</div>

</body>

</html>
`;

async function main() {

  const engine =
    new RuntimeEngine(

      new MockLoader(),

      new RuntimeExecutor(),

    );

  const result =
    await engine.execute({

      retailer: "nike",

      category: "Footwear",

      html,

    });

  console.log(
    result.product
  );

  console.log();

  console.log(
    "RUNTIME ENGINE TEST PASSED"
  );

}

main();