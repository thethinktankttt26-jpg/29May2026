import { NextResponse } from "next/server";
import { supabase } from "../../../../../services/supabase/client";
import { validateBlueprint } from "../../../../../services/validation/validateBlueprint";

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

    const { data: blueprint, error } = await supabase
      .from("retailer_blueprints")
      .select("*")
      .eq("retailer_id", retailerId)
      .single();

    if (error) {
      throw error;
    }

    const validation = validateBlueprint(blueprint);

    return NextResponse.json({
      success: true,
      validation,
    });
  } catch (error) {
    console.error("BLUEPRINT VALIDATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to validate blueprint",
      },
      {
        status: 500,
      }
    );
  }
}