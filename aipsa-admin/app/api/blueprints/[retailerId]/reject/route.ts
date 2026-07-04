import { NextResponse } from "next/server";
import { rejectBlueprint } from "../../../../../services/discovery/blueprint/approvalService";

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

    const blueprint = await rejectBlueprint(retailerId);

    return NextResponse.json({
      success: true,
      blueprint,
    });
  } catch (error) {
    console.error("REJECT BLUEPRINT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to reject blueprint",
      },
      {
        status: 500,
      }
    );
  }
}