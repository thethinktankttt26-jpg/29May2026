export function calculateHealthScore(
  missingFields: string[]
): number {

  const score =
    100 -
    missingFields.length * 10;

  return Math.max(
    score,
    0
  );

}