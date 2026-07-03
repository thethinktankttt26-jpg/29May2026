import { supabase } from "../supabase/client";

export async function createDiscovery(
  retailerId: string,
  pageType: string,
  pageUrl: string
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);

  const { error } = await supabase
    .from("retailer_discovery")
    .insert({
      retailer_id: retailerId,
      page_type: pageType,
      page_url: pageUrl,
      status: "PENDING",
    });

  if (error) {
    console.error("INSERT ERROR:", error);
    throw error;
  }

  console.log("Discovery created successfully.");
}