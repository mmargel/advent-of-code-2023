import { runTest } from "../utils/runTest.js";
import {
  NUMBER_PATTERN,
  getMatches,
  getMatchingIndices,
  getNumRange,
  numInRange,
} from "./common.js";

const GEAR_SYMBOL_PATTERN = /(\*)/g;

const findGearRatios = (
  prevRow: string,
  row: string,
  nextRow: string
): number[] => {
  const gears = getMatchingIndices([row], GEAR_SYMBOL_PATTERN);
  if (!gears.length) {
    return [];
  }

  const numbers = getMatches([prevRow, row, nextRow], NUMBER_PATTERN);

  const gearRatios: number[] = [];
  let numIndex = 0;
  let gearIndex = 0;

  let cogs: number[] = [];
  while (gears[gearIndex] && numbers[numIndex]) {
    const currentGear = gears[gearIndex];
    const currentNum = numbers[numIndex];

    const numberRange = getNumRange(currentNum);

    // if they overlap, log the number and advance number
    // else if current symbol is behind current number, advance symbol
    // if current sumbol is ahead of current number, advance number
    if (numInRange(currentGear, numberRange)) {
      cogs.push(+currentNum.val);
      numIndex++;
    } else if (currentGear < numberRange[0]) {
      // When advancing the gear, flush the cog buffer
      gearIndex++;
      if (cogs.length === 2) {
        gearRatios.push(cogs[0] * cogs[1]);
      }
      cogs = [];
    } else {
      numIndex++;
    }
  }

  // There's a special case where the final number is within range of a gear,
  // so we need to flush the cog queue when that happens.
  if (cogs.length === 2) {
    gearRatios.push(cogs[0] * cogs[1]);
  }

  return gearRatios;
};

const findSolution = (values: string[]): number => {
  return values
    .flatMap((_, i) =>
      findGearRatios(values[i - 1] ?? "", values[i], values[i + 1] ?? "")
    )
    .reduce((acc, val) => acc + val, 0);
};

// Solution: 91622824
export const solvePart = () =>
  runTest({ day: 3, part: 2, testMethod: findSolution });
