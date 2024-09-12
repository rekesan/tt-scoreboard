import { atom } from "jotai";
import { selectAtom } from "jotai/utils";

export const gameRules = atom({
  pointsToWinSet: 11,
  setPointsDiff2Win: 2,
  numOfSets: 3,
  autoSwap: true,
});

interface Player {
  name: string;
  scoresPerSet: number[];
}

export const player1 = atom<Player>({
  name: "Player 1",
  scoresPerSet: [],
});

export const player2 = atom<Player>({
  name: "Player 1",
  scoresPerSet: [],
});

export const gameState = atom((get) => {
  const rules = get(gameRules);
  const p1 = get(player1);
  const p2 = get(player2);

  const numOfSets2Win = Math.ceil(rules.numOfSets / 2);
  let p1SetScore = 0;
  let p2SetScore = 0;

  for (let i = 0; i < rules.numOfSets; i++) {
    const p1Score = p1.scoresPerSet[i];
    const p2Score = p2.scoresPerSet[i];

    if (
      p1Score >= rules.pointsToWinSet &&
      p1Score - p2Score >= rules.setPointsDiff2Win
    ) {
      p1SetScore += 1;
    }
    if (
      p2Score >= rules.pointsToWinSet &&
      p2Score - p1Score >= rules.setPointsDiff2Win
    ) {
      p2SetScore += 1;
    }
  }

  let isGameOver = false;
  let winner: Player | null = null;

  if (numOfSets2Win === p1SetScore) {
    winner = p1;
    isGameOver = true;
  }
  if (numOfSets2Win === p2SetScore) {
    winner = p2;
    isGameOver = true;
  }

  return {
    currentSet: 0,
    isGameOver,
    winner
  };
});

export const isGameOver = selectAtom(gameState, (v) => v.isGameOver);
