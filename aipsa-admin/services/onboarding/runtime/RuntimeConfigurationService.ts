import {
  RuntimeConfiguration,
} from "./RuntimeConfiguration";

import {
  SupabaseBlueprintRepository,
} from "../../extraction/repository/supabaseBlueprintRepository";

export class RuntimeConfigurationService {

  private readonly blueprintRepository =
    new SupabaseBlueprintRepository();

  async generate(
    retailerId: string,
    category: string
  ): Promise<RuntimeConfiguration> {

    const blueprint =
      await this.blueprintRepository.getActive(
        retailerId,
        category
      );

    if (!blueprint) {
      throw new Error(
        `No active blueprint found for retailer '${retailerId}' and category '${category}'.`
      );
    }

    return {

      retailerId,

      category,

      blueprintId: blueprint.id,

      blueprintVersion: blueprint.version,

      extractionConfig:
        blueprint.extractionConfig,

      generatedAt: new Date(),

      status: "GENERATED",

      ready: true,

    };

  }

}