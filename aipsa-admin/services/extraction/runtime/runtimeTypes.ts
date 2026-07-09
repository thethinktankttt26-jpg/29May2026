import {
  ExtractionConfigV1,
} from "../contracts/extractionConfigV1";

export interface RuntimeRequest {

  retailer: string;

  category: string;

  html: string;

}

export interface RuntimeProduct {

  productName: string | null;

  brand: string | null;

  productIdentifier: string | null;

  currentPrice: string | null;

  originalPrice: string | null;

  currency: string | null;

  primaryImage: string | null;

  additionalImages: string[];

  sizes: string[];

  colours: string[];

  stockAvailability: string | null;

}

export interface RuntimeResult {

  blueprint: ExtractionConfigV1;

  product: RuntimeProduct;

}