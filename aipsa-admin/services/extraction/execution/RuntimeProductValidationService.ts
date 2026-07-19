import { RuntimeProduct } from "@/services/extraction/runtime/runtimeTypes";

export interface RuntimeProductValidationResult {
  valid: boolean;
  errors: string[];
}

export class RuntimeProductValidationService {

  validate(
    product: RuntimeProduct
  ): RuntimeProductValidationResult {

    const errors: string[] = [];

    if (!product.productName) {
      errors.push("Missing product name.");
    }

    if (!product.currentPrice) {
      errors.push("Missing current price.");
    }

    if (!product.primaryImage) {
      errors.push("Missing primary image.");
    }

    return {
      valid: errors.length === 0,
      errors,
    };

  }

}