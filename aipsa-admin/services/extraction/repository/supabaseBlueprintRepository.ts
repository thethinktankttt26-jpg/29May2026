import {
  BlueprintRepository,
} from "./blueprintRepository";

import {
  BlueprintRecord,
  NewBlueprintRecord,
} from "./blueprintRepositoryTypes";

import {
  supabase,
} from "./supabaseClient";

export class SupabaseBlueprintRepository
  implements BlueprintRepository {

  private async getNextVersion(
    retailerId: string,
    category: string
  ): Promise<number> {

    const { data, error } = await supabase
      .from("extraction_blueprints")
      .select("version")
      .eq("retailer_id", retailerId)
      .eq("category", category)
      .order("version", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.version
      ? data.version + 1
      : 1;

  }

  async save(
    blueprint: NewBlueprintRecord
  ): Promise<number> {

    const version =
      await this.getNextVersion(
        blueprint.retailerId,
        blueprint.category
      );

    const { error } = await supabase
      .from("extraction_blueprints")
      .insert({
        retailer_id: blueprint.retailerId,
        category: blueprint.category,
        version,
        status: blueprint.status,
        confidence: blueprint.confidence,
        extraction_config: blueprint.extractionConfig,
        created_by: blueprint.createdBy,
        notes: blueprint.notes,
        created_at: blueprint.createdAt,
        activated_at: blueprint.activatedAt,
        archived_at: blueprint.archivedAt,
      });

    if (error) {
      throw error;
    }

    return version;

  }

  async getActive(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord | null> {

    const { data, error } = await supabase
      .from("extraction_blueprints")
      .select("*")
      .eq("retailer_id", retailerId)
      .eq("category", category)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      retailerId: data.retailer_id,
      category: data.category,
      version: data.version,
      status: data.status,
      confidence: Number(data.confidence),
      extractionConfig: data.extraction_config,
      createdBy: data.created_by,
      notes: data.notes,
      createdAt: new Date(data.created_at),
      activatedAt: data.activated_at
        ? new Date(data.activated_at)
        : null,
      archivedAt: data.archived_at
        ? new Date(data.archived_at)
        : null,
    };

  }

  async hasActiveBlueprint(
    retailerId: string
  ): Promise<boolean> {

    const { data, error } = await supabase
      .from("extraction_blueprints")
      .select("id")
      .eq("retailer_id", retailerId)
      .eq("status", "ACTIVE")
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data !== null;

  }

  async getVersion(
    retailerId: string,
    category: string,
    version: number
  ): Promise<BlueprintRecord | null> {

    const { data, error } = await supabase
      .from("extraction_blueprints")
      .select("*")
      .eq("retailer_id", retailerId)
      .eq("category", category)
      .eq("version", version)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      retailerId: data.retailer_id,
      category: data.category,
      version: data.version,
      status: data.status,
      confidence: Number(data.confidence),
      extractionConfig: data.extraction_config,
      createdBy: data.created_by,
      notes: data.notes,
      createdAt: new Date(data.created_at),
      activatedAt: data.activated_at
        ? new Date(data.activated_at)
        : null,
      archivedAt: data.archived_at
        ? new Date(data.archived_at)
        : null,
    };

  }

  async getHistory(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord[]> {

    throw new Error(
      "Not implemented."
    );

  }

  async activate(
    blueprintId: string
  ): Promise<void> {

    throw new Error(
      "Not implemented."
    );

  }

  async archive(
    blueprintId: string
  ): Promise<void> {

    throw new Error(
      "Not implemented."
    );

  }

}