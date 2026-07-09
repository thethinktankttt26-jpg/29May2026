import {
  BlueprintRecord,
  NewBlueprintRecord,
} from "./blueprintRepositoryTypes";

export interface BlueprintRepository {

  save(
    blueprint: NewBlueprintRecord
  ): Promise<number>;

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