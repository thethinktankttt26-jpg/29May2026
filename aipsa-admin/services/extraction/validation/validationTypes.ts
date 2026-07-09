    export type ValidationStatus =
    | "READY"
    | "REVIEW_REQUIRED"
    | "FAILED";

    export interface ValidationIssue {

    field: string;

    severity: "WARNING" | "ERROR";

    message: string;

    }

    export interface BlueprintValidationResult {

    status: ValidationStatus;

    totalFields: number;

    populatedFields: number;

    coveragePercentage: number;

    issues: ValidationIssue[];

    }