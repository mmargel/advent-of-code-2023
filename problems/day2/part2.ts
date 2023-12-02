import { runTest } from "../utils/runTest.js";
import { Colour, Sample, parseRounds } from "./common.js";

const findMinMarbles = (samples: Sample[]): Sample => {
  return samples.reduce((acc, sample) => {
    Object.values(Colour).forEach((colour) => {
      acc[colour] = Math.max(acc[colour] ?? 0, sample[colour] ?? 0);
    });
    return acc;
  }, {});
};

const findSolution = (values: string[]): number => {
  return parseRounds(values)
    .map(({ samples }) => findMinMarbles(samples))
    .map((marblesNeeded) =>
      Object.values(marblesNeeded).reduce((acc, val) => acc * val, 1)
    )
    .reduce((acc, marblesNeeded) => acc + marblesNeeded, 0);
};

// Solution: 56580
export const solvePart = () =>
  runTest({ day: 2, part: 2, testMethod: findSolution });
