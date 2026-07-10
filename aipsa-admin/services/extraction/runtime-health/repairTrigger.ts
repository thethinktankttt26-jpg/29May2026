import {
  RuntimeHealthResult,
} from "./runtimeHealthTypes";

export function shouldTriggerRepair(
  health: RuntimeHealthResult
): boolean {

  return (
    health.recommendation === "REPAIR"
  );

}