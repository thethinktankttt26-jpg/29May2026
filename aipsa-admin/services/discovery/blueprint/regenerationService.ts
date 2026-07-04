import { supabase } from "../../supabase/client";
import { archiveCurrentBlueprint } from "./blueprintHistoryService";

export async function prepareBlueprintRegeneration(
  retailerId: string
) {
  // 1. Load current blueprint version

  const { data, error } = await supabase
    .from("retailer_blueprints")
    .select("version")
    .eq("retailer_id", retailerId)
    .single();

  if (error) {
    throw error;
  }

  const currentVersion = data.version ?? 1;

  // 2. Archive the current blueprint before regeneration overwrites it

  await archiveCurrentBlueprint(retailerId);

  // 3. Return the next version number

  return currentVersion + 1;
}