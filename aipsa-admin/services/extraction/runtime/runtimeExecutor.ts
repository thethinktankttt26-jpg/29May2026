import {
  CompiledBlueprint,
} from "./runtimeCompilerTypes";

import {
  RuntimeProduct,
} from "./runtimeTypes";

export class RuntimeExecutor {

  execute(
    _blueprint: CompiledBlueprint,
    _html: string
  ): RuntimeProduct {

    return {

      productName: null,

      brand: null,

      productIdentifier: null,

      currentPrice: null,

      originalPrice: null,

      currency: null,

      primaryImage: null,

      additionalImages: [],

      sizes: [],

      colours: [],

      stockAvailability: null,

    };

  }

}