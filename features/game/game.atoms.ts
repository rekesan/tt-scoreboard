import { atom, getDefaultStore } from "jotai";
import { Alert } from "react-native";

const store = getDefaultStore();

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
  name: "Player 2",
  scoresPerSet: [],
});

export const currentSetAtom = atom(0);

function incrementSet() {
  store.set(currentSetAtom, (prev) => prev + 1);
}

const resetting = atom(false);

export const gameState = atom((get) => {
  const rules = get(gameRules);
  const currentSet = get(currentSetAtom);
  const p1 = get(player1);
  const p2 = get(player2);

  const numOfSets2Win = Math.ceil(rules.numOfSets / 2);
  let p1SetScore = 0;
  let p2SetScore = 0;
  let currentSetWinner: Player | null = null;

  for (let i = 0; i < rules.numOfSets; i++) {
    const p1Score = p1.scoresPerSet[i] || 0;
    const p2Score = p2.scoresPerSet[i] || 0;

    if (store.get(resetting)) continue;

    if (
      p1Score >= rules.pointsToWinSet &&
      p1Score - p2Score >= rules.setPointsDiff2Win
    ) {
      p1SetScore += 1;
      if (i === currentSet) {
        currentSetWinner = p1;
      }
    }
    if (
      p2Score >= rules.pointsToWinSet &&
      p2Score - p1Score >= rules.setPointsDiff2Win
    ) {
      p2SetScore += 1;
      if (i === currentSet) {
        currentSetWinner = p2;
      }
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

  if (isGameOver && winner) {
    Alert.alert("Game over!", `${winner.name} wins the match!`);
  } else if (currentSetWinner) {
    Alert.alert(
      "Set Win",
      `${currentSetWinner.name} wins set ${currentSet + 1}!`,
      [{ text: "Next", onPress: incrementSet }]
    );
  }

  return {
    currentSet,
    isGameOver,
    winner,
    p1SetScore,
    p2SetScore,
  };
});

export function resetGame() {
  store.set(resetting, true);
  store.set(player1, (prev) => ({ ...prev, scoresPerSet: [] }));
  store.set(player2, (prev) => ({ ...prev, scoresPerSet: [] }));
  store.set(currentSetAtom, 0);
  store.set(resetting, false);
}
