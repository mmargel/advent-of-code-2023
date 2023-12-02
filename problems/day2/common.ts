export type Sample = { [key in Colour]?: number };

interface Round {
  id: number;
  samples: Sample[];
}

export enum Colour {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const parseId = (idSlug: string) => +idSlug.split(" ")[1];

const parseSample = (sampleString: string): Sample => {
  return sampleString.split(",").reduce<Sample>((sample, draw) => {
    const [count, colour] = draw.trim().split(" ");
    // I'm not sure why it doesn't behave like this, but I expected the next line to
    // give a "colour is not a Colour" error
    return { ...sample, [colour]: +count };
  }, {});
};

export const parseRounds = (values: string[]): Round[] => {
  return values.map((round) => {
    const [idSlug, countSlug] = round.split(":") as [string, string];
    const id = parseId(idSlug);

    const samples = countSlug
      .trim()
      .split(";")
      .map((sample) => parseSample(sample.trim()));

    return { id, samples };
  });
};
