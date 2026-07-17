import {
  RuntimeConfiguration,
} from "./RuntimeConfiguration";

export class RuntimeConfigurationService {

  async generate(
    retailerId: string,
    category: string
  ): Promise<RuntimeConfiguration> {

    /*
      Phase 6.3

      Placeholder implementation.

      Phase 6.4 will replace this with the
      production implementation that loads
      the active blueprint and extraction
      configuration.
    */

    return {

      retailerId,

      category,

      blueprintId: "",

      blueprintVersion: 1,

      extractionConfig: {} as any,

      generatedAt: new Date(),

      status: "GENERATED",

      ready: true,

    };

  }

}