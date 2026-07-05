import { chromium } from "playwright";

import {
  ProductPageAcquisitionResult,
} from "./acquisitionTypes";

export async function acquireProductPageBrowser(
  requestedUrl: string
): Promise<ProductPageAcquisitionResult> {
  const acquiredAt = new Date().toISOString();

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage();

    const response = await page.goto(requestedUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    if (!response) {
      return {
        requestedUrl,
        finalUrl: page.url() || null,
        html: null,
        method: "BROWSER",
        status: "FAILED",
        httpStatus: null,
        contentType: null,
        acquiredAt,
        error: "Browser navigation returned no HTTP response.",
      };
    }

    const httpStatus = response.status();

    const contentType =
      response.headers()["content-type"] ?? null;

    if (!response.ok()) {
      return {
        requestedUrl,
        finalUrl: page.url() || requestedUrl,
        html: null,
        method: "BROWSER",
        status: "FAILED",
        httpStatus,
        contentType,
        acquiredAt,
        error: `Browser request failed with status ${httpStatus}.`,
      };
    }

    const html = await page.content();

    return {
      requestedUrl,
      finalUrl: page.url() || requestedUrl,
      html,
      method: "BROWSER",
      status: "SUCCESS",
      httpStatus,
      contentType,
      acquiredAt,
      error: null,
    };
  } catch (error) {
    return {
      requestedUrl,
      finalUrl: null,
      html: null,
      method: "BROWSER",
      status: "FAILED",
      httpStatus: null,
      contentType: null,
      acquiredAt,
      error:
        error instanceof Error
          ? error.message
          : "Unknown browser acquisition error.",
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
