import { runTest } from "../utils/runTest.js";

const FIRST_DIGIT_PATTERN = new RegExp(`^.*?(\\d)`);
const LAST_DIGIT_PATTERN = new RegExp(`^.*(\\d).*?$`);

const calibrateLine = (line: string): number => {
  const first = line.match(FIRST_DIGIT_PATTERN)![1];
  const last = line.match(LAST_DIGIT_PATTERN)![1];

  return 10 * +first + +last;
};

const findSolution = (values: string[]): number => {
  return values.map(calibrateLine).reduce((acc, val) => acc + val, 0);
};

// Solution: 54450
export const solvePart = () =>
  runTest({ day: 1, part: 1, testMethod: findSolution });
