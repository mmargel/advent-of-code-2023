import { getProblemInput } from "./input.js";

type TestMethod = (args: string[]) => void;

interface TestDetails {
  part: number;
  day: number;
  testMethod: TestMethod;
  actual?: boolean;
  allowComments?: boolean;
}

export const runTest = ({
  day,
  part,
  testMethod,
  actual = true,
  allowComments = true,
}: TestDetails) => {
  const input = getProblemInput({ day, actual, allowComments });

  process.stdout.write(`Running test: Day ${day}, Part ${part} ... `);
  const result = testMethod(input);
  console.log(`Done!`);
  console.log(`Result: ${result}`);
};
