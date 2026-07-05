export type ProductPageAcquisitionMethod =
  | "DIRECT_HTTP"
  | "BROWSER"
  | "CONTROLLED_SAMPLE";

export type ProductPageAcquisitionStatus =
  | "SUCCESS"
  | "FAILED";

export interface ProductPageAcquisitionResult {
  requestedUrl: string;

  finalUrl: string | null;

  html: string | null;

  method: ProductPageAcquisitionMethod;

  status: ProductPageAcquisitionStatus;

  httpStatus: number | null;

  contentType: string | null;

  acquiredAt: string;

  error: string | null;
}
