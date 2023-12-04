import { runTest } from "../utils/runTest.js";
import { Game, parseScratcher, playSingleGame } from "./common.js";

const playGames = (games: Game[]) => {
  const scratcherCounts: Record<number, number> = {};

  return games.reduce((gamesPlayed, game) => {
    const matches = playSingleGame(game);
    const numScratchers = scratcherCounts[game.card.id] ?? 1;

    // We win 1 scratcher for each instance of the current scratcher, for each
    // of the following N scratchers
    for (let i = 1; i <= matches; i++) {
      scratcherCounts[game.card.id + i] =
        (scratcherCounts[game.card.id + i] ?? 1) + numScratchers;
    }

    return gamesPlayed + numScratchers;
  }, 0);
};

const findSolution = (values: string[]): number => {
  const scratchers = values.map(parseScratcher);
  const gamesPlayed = playGames(scratchers);
  return gamesPlayed;
};

// Solution: 5539496
export const solvePart = () =>
  runTest({ day: 4, part: 2, testMethod: findSolution });
