import { readFileSync } from "fs";

export interface InputArgs {
  day: number;
  actual: boolean;
  allowComments: boolean;
}

export const getProblemInput = ({
  day,
  actual = false,
  allowComments = true,
}: InputArgs) => {
  const inputPath = [
    ".",
    "data",
    `day${day}`,
    actual ? "input.txt" : "test.txt",
  ].join("/");

  return readFileSync(inputPath)
    .toString()
    .split("\n")
    .filter((line) => !allowComments || line[0] != "#");
};
