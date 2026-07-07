import {
  BlueprintRecord,
} from "./blueprintRepositoryTypes";

export interface BlueprintRepository {

  save(
    blueprint: BlueprintRecord
  ): Promise<void>;

  getActive(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord | null>;

  getVersion(
    retailerId: string,
    category: string,
    version: number
  ): Promise<BlueprintRecord | null>;

  getHistory(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord[]>;

  activate(
    blueprintId: string
  ): Promise<void>;

  archive(
    blueprintId: string
  ): Promise<void>;

}