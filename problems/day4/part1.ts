import { runTest } from "../utils/runTest.js";
import { Game, parseScratcher, playSingleGame } from "./common.js";

const playGames = (games: Game[]) => {
  const gameQueue = [...games];
  let totalScore = 0;
  let game: Game | undefined;
  while ((game = gameQueue.pop())) {
    const matches = playSingleGame(game);
    if (matches > 0) {
      totalScore += 2 ** (matches - 1);
    }
  }
  return totalScore;
};

const findSolution = (values: string[]): number => {
  const scratchers = values.map(parseScratcher);
  const points = playGames(scratchers);
  return points;
};

// Solution: 21821
export const solvePart = () =>
  runTest({ day: 4, part: 1, testMethod: findSolution });
