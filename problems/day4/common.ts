interface Card {
  id: number;
  winners: Set<number>;
}

export interface Game {
  card: Card;
  picks: Set<number>;
}

const parseNumbers = (numString: string) =>
  new Set(
    numString
      .trim()
      .replace(/  /g, " ")
      .split(" ")
      .map((nums) => Number(nums))
  );

const parseCardNumber = (cardStr: string): number => {
  return Number(cardStr.match(/\d+/)![0]);
};

export const parseScratcher = (
  scratcher: string
): { card: Card; picks: Set<number> } => {
  const [cardStr, winnersStr, picksStr] = scratcher
    .replace(/  /g, " ")
    .split(/[:|]/);
  const cardNumber = parseCardNumber(cardStr);
  const winners = parseNumbers(winnersStr);
  const picks = parseNumbers(picksStr);

  return { card: { id: cardNumber, winners }, picks };
};

export const playSingleGame = ({ card, picks }: Game) => {
  return [...picks].reduce(
    (acc, pick) => acc + (card.winners.has(pick) ? 1 : 0),
    0
  );
};
