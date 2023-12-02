import { runTest } from "../utils/runTest.js";
import { Colour, Sample, parseRounds } from "./common.js";

const MAX_MARBLE_COUNTS: Record<Colour, number> = {
  [Colour.RED]: 12,
  [Colour.GREEN]: 13,
  [Colour.BLUE]: 14,
};

const validateSample = (sample: Sample) => {
  return Object.values(Colour).every(
    (colour) => (sample[colour] ?? 0) <= MAX_MARBLE_COUNTS[colour]
  );
};

const findSolution = (values: string[]): number => {
  return parseRounds(values)
    .filter(({ samples }) => samples.every(validateSample))
    .reduce((acc, { id }) => acc + id, 0);
};

// Solution: 2727
export const solvePart = () =>
  runTest({ day: 2, part: 1, testMethod: findSolution });
