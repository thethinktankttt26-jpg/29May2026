import {
  RuntimeProduct,
} from "../runtime/runtimeTypes";

export interface ProductValidationResult {

  url: string;

  success: boolean;

  extracted: RuntimeProduct;

  missingFields: string[];

}

export interface MultiProductValidationResult {

  totalProducts: number;

  successfulProducts: number;

  failedProducts: number;

  successRate: number;

  fieldSuccess: Record<string, number>;

  results: ProductValidationResult[];

}