import path from "path";

export async function resolveExtractionConfig(
  category: string
): Promise<string> {

  /*
    Phase 6.4

    Temporary implementation.

    Today all categories use the same
    approved extraction configuration.

    Future versions will resolve the
    active configuration based on
    category, retailer and blueprint.
  */

  void category;

  return path.resolve(
    process.cwd(),
    "services/extraction/configs/manual/next/clothing-v1.json"
  );

}