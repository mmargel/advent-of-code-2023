import { runTest } from "../utils/runTest.js";
import {
  NUMBER_PATTERN,
  getMatches,
  getMatchingIndices,
  getNumRange,
  numInRange,
} from "./common.js";

const SYMBOL_PATTERN = /([^\d\.])/g;

const findPartNumbers = (
  prevRow: string,
  row: string,
  nextRow: string
): number[] => {
  const symbols = getMatchingIndices([prevRow, row, nextRow], SYMBOL_PATTERN);
  if (!symbols.length) {
    return [];
  }

  const numbers = getMatches([row], NUMBER_PATTERN);

  const partNumbers: number[] = [];
  let numIndex = 0;
  let symIndex = 0;
  while (symbols[symIndex] && numbers[numIndex]) {
    const currentNum = numbers[numIndex];
    const currentSymbol = symbols[symIndex];
    const numberRange = getNumRange(currentNum);

    // if they overlap, log the number and advance number
    // else if current symbol is behind current number, advance symbol
    // if current sumbol is ahead of current number, advance number
    if (numInRange(currentSymbol, numberRange)) {
      partNumbers.push(+currentNum.val);
      numIndex++;
    } else if (currentSymbol < numberRange[0]) {
      symIndex++;
    } else {
      numIndex++;
    }
  }

  return partNumbers;
};

const findSolution = (values: string[]): number => {
  return values
    .flatMap((_, i) =>
      findPartNumbers(values[i - 1] ?? "", values[i], values[i + 1] ?? "")
    )
    .reduce((acc, val) => acc + val, 0);
};

// Solution: 560670
export const solvePart = () =>
  runTest({ day: 3, part: 1, testMethod: findSolution });
