type Range = [min: number, max: number];

export const NUMBER_PATTERN = /(\d+)/g;

export const numInRange = (num: number, [min, max]: Range) => {
  return min <= num && num <= max;
};

export const getNumRange = ({
  index,
  val,
}: {
  index: number;
  val: string;
}): Range => [index - 1, index + val.length];

export const getMatches = (values: string[], pattern: RegExp) => {
  return values
    .flatMap((str) => [...str.matchAll(pattern)])
    .map((match) => ({ val: match[0], index: match.index! }))
    .sort((first, second) => first.index - second.index);
};

export const getMatchingIndices = (values: string[], pattern: RegExp) => {
  return getMatches(values, pattern).map(({ index }) => index);
};
