import { runTest } from "../utils/runTest.js";

const REPLACEMENT_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const FIRST_DIGIT_PATTERN = new RegExp(
  `^.*?(${[...Object.keys(REPLACEMENT_MAP), "\\d"].join("|")})`
);
const LAST_DIGIT_PATTERN = new RegExp(
  `^.*(${[...Object.keys(REPLACEMENT_MAP), "\\d"].join("|")}).*?$`
);

const calibrateLine = (line: string): number => {
  const first = line.match(FIRST_DIGIT_PATTERN)![1];
  const last = line.match(LAST_DIGIT_PATTERN)![1];

  const firstVal =
    REPLACEMENT_MAP[first as keyof typeof REPLACEMENT_MAP] ?? +first;
  const lastVal =
    REPLACEMENT_MAP[last as keyof typeof REPLACEMENT_MAP] ?? +last;

  return 10 * firstVal + lastVal;
};

const findSolution = (values: string[]): number => {
  return values.map(calibrateLine).reduce((acc, val) => acc + val, 0);
};

// Solution: 54265
export const solvePart = () =>
  runTest({ day: 1, part: 2, testMethod: findSolution });
