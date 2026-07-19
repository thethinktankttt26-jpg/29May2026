import { RuntimeExtractionRequest } from "./RuntimeExtractionRequest";
import { RetailerResolver } from "./RetailerResolver";

import { RuntimeConfigurationService } from "@/services/onboarding/runtime/RuntimeConfigurationService";
import { RuntimeActivationService } from "@/services/onboarding/runtime/RuntimeActivationService";

import { acquireProductPage } from "@/services/extraction/acquisition/acquireProductPage";

import { compileBlueprint } from "@/services/extraction/runtime/runtimeCompiler";
import { RuntimeExecutor } from "@/services/extraction/runtime/runtimeExecutor";

import { RuntimeProductValidationService } from "./RuntimeProductValidationService";
import { RuntimeExtractionResult } from "./RuntimeExtractionResult";

export class RuntimeExtractionOrchestrator {

  private readonly retailerResolver =
    new RetailerResolver();

  private readonly runtimeConfigurationService =
    new RuntimeConfigurationService();

  private readonly runtimeActivationService =
    new RuntimeActivationService();

  private readonly runtimeExecutor =
    new RuntimeExecutor();

private readonly validator =
  new RuntimeProductValidationService();

  async execute(
  request: RuntimeExtractionRequest
): Promise<RuntimeExtractionResult>
  {

    /*
     * Product URL
     * ↓
     * Identify Retailer
     */

    const retailerId =
      await this.retailerResolver.resolve(
        request
      );

    /*
     * Temporary.
     *
     * Phase 8:
     * Runtime configuration will become
     * retailer-driven instead of category-driven.
     */

    const runtime =
      await this.runtimeConfigurationService.generate(

        retailerId,

        "DEFAULT",

      );

    /*
     * Activate Runtime
     */

    const session =
      this.runtimeActivationService.activate(
        runtime
      );

    /*
     * Acquire Product Page
     */

    const page =
      await acquireProductPage(
        request.productUrl
      );

    if (
      page.status !== "SUCCESS" ||
      !page.html
    ) {

      throw new Error(
        page.error ??
        "Failed to acquire product page."
      );

    }

    /*
     * Compile Extraction Configuration
     */

    const compiledBlueprint =
      compileBlueprint(
        session.runtime.extractionConfig
      );

    /*
     * Execute Generic Runtime Extraction
     */

    const product =
      this.runtimeExecutor.execute(

        compiledBlueprint,

        page.html,

      );

      const validation =
  this.validator.validate(
    product
  );

if (!validation.valid) {

  throw new Error(

    `Product validation failed:\n${validation.errors.join("\n")}`

  );

}

    /*
     * Phase 7.6
     *
     * Product Validation
     */

    return {

  retailerId,

  productUrl: request.productUrl,

  extractedAt: new Date(),

  product,

};

  }

}