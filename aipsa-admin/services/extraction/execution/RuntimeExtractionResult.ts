import { RuntimeProduct } from "@/services/extraction/runtime/runtimeTypes";

export interface RuntimeExtractionResult {

  retailerId: string;

  productUrl: string;

  extractedAt: Date;

  product: RuntimeProduct;

}