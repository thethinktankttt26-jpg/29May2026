import { NextResponse } from "next/server";
import { supabase } from "../../../../../services/supabase/client";
import { prepareBlueprintRegeneration } from "../../../../../services/discovery/blueprint/regenerationService";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      retailerId: string;
    }>;
  }
) {
  try {
    const { retailerId } = await context.params;

    // 1. Get retailer base URL

    const { data: retailer, error: retailerError } =
      await supabase
        .from("retailers")
        .select("base_url")
        .eq("id", retailerId)
        .single();

    console.log("REGENERATE RETAILER:", retailer);
    console.log(
      "REGENERATE RETAILER ERROR:",
      retailerError
    );

    if (retailerError) {
      throw retailerError;
    }

    // 2. Calculate next blueprint version

    const nextVersion =
      await prepareBlueprintRegeneration(retailerId);

    console.log(
      "REGENERATE NEXT VERSION:",
      nextVersion
    );

    // 3. Call existing Discovery API

    const discoveryResponse = await fetch(
      new URL("/api/discovery", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          retailerId,
          url: retailer.base_url,
          version: nextVersion,
        }),
      }
    );

    const discoveryResult =
      await discoveryResponse.json();

    console.log(
      "REGENERATE DISCOVERY RESULT:",
      discoveryResult
    );

    if (!discoveryResponse.ok) {
      throw new Error(
        discoveryResult.error ||
          "Discovery failed during regeneration"
      );
    }

    // 4. Load regenerated blueprint

    const {
      data: blueprint,
      error: blueprintError,
    } = await supabase
      .from("retailer_blueprints")
      .select("*")
      .eq("retailer_id", retailerId)
      .single();

    console.log(
      "REGENERATE BLUEPRINT:",
      blueprint
    );

    console.log(
      "REGENERATE BLUEPRINT ERROR:",
      blueprintError
    );

    if (blueprintError) {
      throw blueprintError;
    }

    return NextResponse.json({
      success: true,
      blueprint,
    });
  } catch (error) {
    console.error(
      "REGENERATE BLUEPRINT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to regenerate blueprint",
      },
      {
        status: 500,
      }
    );
  }
}