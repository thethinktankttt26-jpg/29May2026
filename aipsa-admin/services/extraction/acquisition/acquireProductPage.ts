import {
  ProductPageAcquisitionResult,
} from "./acquisitionTypes";

import {
  acquireProductPageDirect,
} from "./acquireProductPageDirect";

import {
  acquireProductPageBrowser,
} from "./acquireProductPageBrowser";

import {
  acquireProductPageControlledSample,
} from "./acquireProductPageControlledSample";

export interface AcquireProductPageOptions {
  controlledSampleFilePath?: string;
}

export async function acquireProductPage(
  requestedUrl: string,
  options: AcquireProductPageOptions = {}
): Promise<ProductPageAcquisitionResult> {
  const directResult =
    await acquireProductPageDirect(requestedUrl);

  if (directResult.status === "SUCCESS") {
    return directResult;
  }

  const browserResult =
    await acquireProductPageBrowser(requestedUrl);

  if (browserResult.status === "SUCCESS") {
    return browserResult;
  }

  if (options.controlledSampleFilePath) {
    return await acquireProductPageControlledSample(
      requestedUrl,
      options.controlledSampleFilePath
    );
  }

  return browserResult;
}
