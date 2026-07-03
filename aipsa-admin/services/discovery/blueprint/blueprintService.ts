import { supabase } from "../../supabase/client";
import { RetailerBlueprint } from "./buildBlueprint";

export async function saveBlueprint(
  retailerId: string,
  blueprint: RetailerBlueprint
) {

  console.log("===== SAVE BLUEPRINT START =====");
  console.log("Retailer ID:", retailerId);
  console.log("Blueprint:", blueprint);

  const { data, error } = await supabase
    .from("retailer_blueprints")
    .upsert(
      {
        retailer_id: retailerId,
        blueprint,
        confidence_score: 100,
        status: "DRAFT",
      },
      {
        onConflict: "retailer_id",
      }
    )
    .select();

  console.log("Returned Data:", data);
  console.log("Supabase Error:", error);
  console.log("===== SAVE BLUEPRINT END =====");

  if (error) {
    throw error;
  }
}