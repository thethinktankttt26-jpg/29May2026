import path from "path";

export async function resolveExtractionConfig(
  retailerId: string
): Promise<string> {

  /*
    Phase 6.4

    Temporary implementation.

    Future versions will resolve the
    active configuration from Blueprint,
    category mapping and Supabase.
  */

  void retailerId;

  return path.resolve(
    process.cwd(),
    "services/extraction/configs/manual/next/clothing-v1.json"
  );

}