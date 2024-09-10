import { Score } from "@/features/game/components/score";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

const numberOfSet = 3;
const points2Win = 11;
const ptsDiff = 2;

export default function Game() {
  const [currentSet, setCurrentSet] = useState(0);
  const [player1, setPlayer1] = useState({
    name: "Player 1",
    scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
  });
  const [player2, setPlayer2] = useState({
    name: "Player 2",
    scoresPerSet: Array.from<number>({ length: numberOfSet }).fill(0),
  });

  const moveToNextSet = () => {
    setCurrentSet((prev) => {
      if (prev === numberOfSet - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const p1Score = player1.scoresPerSet[currentSet];
    const p2Score = player2.scoresPerSet[currentSet];

    if (p1Score >= points2Win && p1Score - p2Score >= ptsDiff) {
      Alert.alert("Winner", `${player1.name} wins set ${currentSet + 1}!`, [
        {
          text: "Ok",
          onPress: moveToNextSet,
        },
      ]);
    }

    if (p2Score >= points2Win && p2Score - p1Score >= ptsDiff) {
      Alert.alert("Winner", `${player2.name} wins set ${currentSet + 1}!`, [
        {
          text: "Ok",
          onPress: moveToNextSet,
        },
      ]);
    }
  }, [player1, player2, currentSet]);

  let p1SetWin = 0;
  let p2SetWin = 0;

  for (let i = 0; i < player1.scoresPerSet.length; i++) {
    const p1Score = player1.scoresPerSet.at(i)!;
    const p2Score = player2.scoresPerSet.at(i)!;

    if (p1Score >= points2Win && p1Score - p2Score >= ptsDiff) {
      p1SetWin += 1;
    }
    if (p2Score >= points2Win && p2Score - p1Score >= ptsDiff) {
      p2SetWin += 1;
    }
  }

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
            {p1SetWin}
          </Text>
          <Text className="flex-1 text-center align-middle text-7xl leading-[1.2] font-mono font-bold text-amber-500">
            {p2SetWin}
          </Text>
        </View>

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
