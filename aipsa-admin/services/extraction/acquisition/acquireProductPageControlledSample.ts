import { readFile } from "fs/promises";

import {
  ProductPageAcquisitionResult,
} from "./acquisitionTypes";

export async function acquireProductPageControlledSample(
  requestedUrl: string,
  sampleFilePath: string
): Promise<ProductPageAcquisitionResult> {
  const acquiredAt = new Date().toISOString();

  try {
    const html = await readFile(sampleFilePath, "utf-8");

    if (!html.trim()) {
      return {
        requestedUrl,
        finalUrl: requestedUrl,
        html: null,
        method: "CONTROLLED_SAMPLE",
        status: "FAILED",
        httpStatus: null,
        contentType: "text/html",
        acquiredAt,
        error: "Controlled sample file is empty.",
      };
    }

    return {
      requestedUrl,
      finalUrl: requestedUrl,
      html,
      method: "CONTROLLED_SAMPLE",
      status: "SUCCESS",
      httpStatus: null,
      contentType: "text/html",
      acquiredAt,
      error: null,
    };
  } catch (error) {
    return {
      requestedUrl,
      finalUrl: requestedUrl,
      html: null,
      method: "CONTROLLED_SAMPLE",
      status: "FAILED",
      httpStatus: null,
      contentType: null,
      acquiredAt,
      error:
        error instanceof Error
          ? error.message
          : "Unknown controlled sample acquisition error.",
    };
  }
}
