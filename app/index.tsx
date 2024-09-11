import { Score } from "@/features/game/components/score";
import { useEffect, useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";

const numberOfSet = 3;
const points2Win = 11;
const ptsDiff = 2;

export default function Game() {
  const [currentSet, setCurrentSet] = useState(0);
  const [player1, setPlayer1] = useState({
    name: "Player 1",
    scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
    setWin: 0,
  });
  const [player2, setPlayer2] = useState({
    name: "Player 2",
    scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
    setWin: 0,
  });

  let gameOver =
    player1.setWin === Math.ceil(numberOfSet / 2) ||
    player2.setWin === Math.ceil(numberOfSet / 2);

  const moveToNextSet = () => {
    setCurrentSet((prev) => {
      if (prev === numberOfSet - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    if (gameOver) {
      const winner =
        player1.setWin === Math.ceil(numberOfSet / 2) ? player1 : player2;
      Alert.alert("Match ends", `${winner.name} wins the game!`, [
        { text: "Reset", onPress: reset },
      ]);
      return;
    }

    const p1Score = player1.scoresPerSet[currentSet];
    const p2Score = player2.scoresPerSet[currentSet];

    if (p1Score >= points2Win && p1Score - p2Score >= ptsDiff) {
      return Alert.alert(
        "Winner",
        `${player1.name} wins set ${currentSet + 1}!`,
        [
          {
            text: "Ok",
            onPress: () => {
              moveToNextSet();
              setPlayer1((prev) => ({ ...prev, setWin: prev.setWin + 1 }));
            },
          },
        ]
      );
    }

    if (p2Score >= points2Win && p2Score - p1Score >= ptsDiff) {
      return Alert.alert(
        "Winner",
        `${player2.name} wins set ${currentSet + 1}!`,
        [
          {
            text: "Ok",
            onPress: () => {
              moveToNextSet();
              setPlayer2((prev) => ({ ...prev, setWin: prev.setWin + 1 }));
            },
          },
        ]
      );
    }
  }, [player1, player2, currentSet, gameOver]);

  const reset = () => {
    setCurrentSet(0);
    setPlayer1((prev) => ({
      ...prev,
      scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
      setWin: 0,
    }));
    setPlayer2((prev) => ({
      ...prev,
      scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
      setWin: 0,
    }));
  };

  return (
    <View className="flex h-screen w-screen flex-row justify-center items-center transition-colors dark:bg-gray-900">
      <Score
        score={player1.scoresPerSet.at(currentSet)}
        playerName={player1.name}
        className="h-screen w-1/2 bg-teal-500"
        add={() => {
          setPlayer1((v) => {
            v.scoresPerSet[currentSet] += 1;
            return { ...v };
          });
        }}
        subtract={() => {
          setPlayer1((v) => {
            if (v.scoresPerSet[currentSet] > 0) {
              v.scoresPerSet[currentSet] -= 1;
            }
            return { ...v };
          });
        }}
      />
      <View className="h-full w-3 items-center bg-white z-10">
        <View className="flex-1" />

        <View className="bg-white px-5 py-1 rounded-t-lg">
          <Text className="w-24 text-center font-mono font-bold text-3xl">
            Set {currentSet + 1}
          </Text>
        </View>
        <View className="flex-row w-48 h-20 bg-white rounded-lg self-center">
          <Text className="flex-1 text-center align-middle text-7xl leading-[1.2] font-mono font-bold text-teal-500">
            {player1.setWin}
          </Text>
          <Text className="flex-1 text-center align-middle text-7xl leading-[1.2] font-mono font-bold text-amber-500">
            {player2.setWin}
          </Text>
        </View>

        <Pressable
          onPress={reset}
          className="w-20 h-10 items-center justify-center active:opacity-50 bg-white rounded-full"
        >
          <Text className="text-xl leading-normal">Reset</Text>
        </Pressable>

        <View className="flex-[1.2]" />
      </View>
      <Score
        score={player2.scoresPerSet.at(currentSet)}
        playerName={player2.name}
        add={() => {
          setPlayer2((v) => {
            v.scoresPerSet[currentSet] += 1;
            return { ...v };
          });
        }}
        subtract={() => {
          setPlayer2((v) => {
            if (v.scoresPerSet[currentSet] > 0) {
              v.scoresPerSet[currentSet] -= 1;
            }
            return { ...v };
          });
        }}
        className="h-screen w-1/2 bg-amber-500"
      />
    </View>
  );
}
