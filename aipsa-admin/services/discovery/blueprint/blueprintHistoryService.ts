import { supabase } from "../../supabase/client";

export async function archiveCurrentBlueprint(
  retailerId: string
) {
  // 1. Load the current blueprint

  const { data: currentBlueprint, error: loadError } =
    await supabase
      .from("retailer_blueprints")
      .select(
        "retailer_id, blueprint, version, confidence_score, status"
      )
      .eq("retailer_id", retailerId)
      .single();

  if (loadError) {
    throw loadError;
  }

  // 2. Archive the current version

  const { error: archiveError } =
    await supabase
      .from("retailer_blueprint_versions")
      .upsert(
        {
          retailer_id: currentBlueprint.retailer_id,
          blueprint: currentBlueprint.blueprint,
          version: currentBlueprint.version,
          confidence_score: currentBlueprint.confidence_score,
          status: currentBlueprint.status,
        },
        {
          onConflict: "retailer_id,version",
          ignoreDuplicates: true,
        }
      );

  if (archiveError) {
    throw archiveError;
  }

  return currentBlueprint;
}