export type RuntimeHealthStatus =
  | "HEALTHY"
  | "WARNING"
  | "CRITICAL";

export interface RuntimeHealthResult {

  status: RuntimeHealthStatus;

  healthScore: number;

  missingFields: string[];

  recommendation:
    | "NONE"
    | "MONITOR"
    | "REPAIR";

}