import { atom } from "jotai";

export const gameRules = atom({
  pointsToWinSet: 11,
  setPointsDiff2Win: 2,
  numOfSets: 3,
  autoSwap: true,
});

interface Player {
  name: string;
  setScores: number[];
}

export const gameState = atom((get) => {
  const rules = get(gameRules);

  return {
    currentSet: 0,
  } satisfies {
    currentSet: number;
  };
});

export const player1 = atom<Player>({
  name: "Player 1",
  setScores: [],
});

export const player2 = atom<Player>({
  name: "Player 1",
  setScores: [],
});
