import {
  ProductPageAcquisitionResult,
} from "./acquisitionTypes";

export async function acquireProductPageDirect(
  requestedUrl: string
): Promise<ProductPageAcquisitionResult> {
  const acquiredAt = new Date().toISOString();

  try {
    const response = await fetch(requestedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AIPSA Product Acquisition/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    const contentType =
      response.headers.get("content-type");

    if (!response.ok) {
      return {
        requestedUrl,
        finalUrl: response.url || requestedUrl,
        html: null,
        method: "DIRECT_HTTP",
        status: "FAILED",
        httpStatus: response.status,
        contentType,
        acquiredAt,
        error: `HTTP request failed with status ${response.status}.`,
      };
    }

    const html = await response.text();

    return {
      requestedUrl,
      finalUrl: response.url || requestedUrl,
      html,
      method: "DIRECT_HTTP",
      status: "SUCCESS",
      httpStatus: response.status,
      contentType,
      acquiredAt,
      error: null,
    };
  } catch (error) {
    return {
      requestedUrl,
      finalUrl: null,
      html: null,
      method: "DIRECT_HTTP",
      status: "FAILED",
      httpStatus: null,
      contentType: null,
      acquiredAt,
      error:
        error instanceof Error
          ? error.message
          : "Unknown direct HTTP acquisition error.",
    };
  }
}
