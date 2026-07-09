import {
  BlueprintRepository,
} from "../repository/blueprintRepository";

import {
  BlueprintRecord,
  NewBlueprintRecord,
} from "../repository/blueprintRepositoryTypes";

export class InMemoryBlueprintRepository
  implements BlueprintRepository {

  private blueprints: BlueprintRecord[] = [];

  private nextId = 1;

  async save(
    blueprint: NewBlueprintRecord
  ): Promise<number> {

    const latestVersion =
      this.blueprints
        .filter(item =>
          item.retailerId === blueprint.retailerId &&
          item.category === blueprint.category
        )
        .reduce(
          (max, item) =>
            Math.max(max, item.version),
          0
        );

    const version =
      latestVersion + 1;

    this.blueprints.push({

      id: String(this.nextId++),

      version,

      ...blueprint,

    });

    return version;

  }

  async getActive(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord | null> {

    return (
      this.blueprints.find(
        item =>
          item.retailerId === retailerId &&
          item.category === category &&
          item.status === "ACTIVE"
      ) ?? null
    );

  }

  async getVersion(
    retailerId: string,
    category: string,
    version: number
  ): Promise<BlueprintRecord | null> {

    return (
      this.blueprints.find(
        item =>
          item.retailerId === retailerId &&
          item.category === category &&
          item.version === version
      ) ?? null
    );

  }

  async getHistory(
    retailerId: string,
    category: string
  ): Promise<BlueprintRecord[]> {

    return this.blueprints
      .filter(
        item =>
          item.retailerId === retailerId &&
          item.category === category
      )
      .sort(
        (a, b) =>
          a.version - b.version
      );

  }

  async activate(
    blueprintId: string
  ): Promise<void> {

    for (const blueprint of this.blueprints) {

      if (
        blueprint.id === blueprintId
      ) {

        blueprint.status = "ACTIVE";
        blueprint.activatedAt =
          new Date();

      }

    }

  }

  async archive(
    blueprintId: string
  ): Promise<void> {

    for (const blueprint of this.blueprints) {

      if (
        blueprint.id === blueprintId
      ) {

        blueprint.status = "ARCHIVED";
        blueprint.archivedAt =
          new Date();

      }

    }

  }

}