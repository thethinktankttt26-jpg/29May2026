import { NextResponse } from "next/server";
import { approveBlueprint } from "../../../../../services/discovery/blueprint/approvalService";

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

    const blueprint = await approveBlueprint(retailerId);

    return NextResponse.json({
      success: true,
      blueprint,
    });
  } catch (error) {
    console.error("APPROVE BLUEPRINT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to approve blueprint",
      },
      {
        status: 500,
      }
    );
  }
}