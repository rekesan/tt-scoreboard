import { Score } from "@/features/game/components/score";
import {
  currentSetAtom,
  gameState,
  player1,
  player2,
  resetGame,
} from "@/features/game/game.atoms";
import { useAtom, useAtomValue } from "jotai";
import { Alert, Pressable, View } from "react-native";
import { Text } from "@/components/AnimatedText";

export default function Game() {
  return (
    <View className="flex h-screen w-screen flex-row justify-center items-center transition-colors">
      <Player atom={player1} className="h-screen w-1/2 bg-cyan-500" />
      <View className="h-full w-3 items-center bg-white z-10">
        <View className="flex-1" />

        <SetScore />

        <Pressable
          onPress={resetGame}
          className="w-20 h-10 items-center justify-center active:opacity-50 bg-white rounded-full"
        >
          <Text className="text-xl leading-normal">Reset</Text>
        </Pressable>

        <View className="flex-[1.2]" />
      </View>
      <Player atom={player2} className="h-screen w-1/2 bg-rose-500" />
    </View>
  );
}

const Player = ({
  atom,
  className,
}: {
  atom: typeof player1;
  className?: string;
}) => {
  const [player, setPlayer] = useAtom(atom);
  const currentSet = useAtomValue(currentSetAtom);

  return (
    <Score
      score={player.scoresPerSet.at(currentSet)}
      playerName={player.name}
      className={className}
      add={() => {
        setPlayer((v) => {
          if (!v.scoresPerSet[currentSet]) {
            v.scoresPerSet[currentSet] = 0;
          }
          v.scoresPerSet[currentSet] += 1;
          return { ...v };
        });
      }}
      subtract={() => {
        setPlayer((v) => {
          if (!v.scoresPerSet[currentSet]) {
            v.scoresPerSet[currentSet] = 0;
          }

          if (v.scoresPerSet[currentSet] > 0) {
            v.scoresPerSet[currentSet] -= 1;
          }
          return { ...v };
        });
      }}
      nameTap={() => {
        Alert.prompt("Rename", `Change ${player.name} to?`, [
          { text: "Cancel", isPreferred: true },
          {
            text: "Next",
            onPress: (newName) => {
              if (newName) {
                setPlayer((prev) => ({ ...prev, name: newName }));
              }
            },
          },
        ]);
      }}
    />
  );
};

const SetScore = () => {
  const state = useAtomValue(gameState);
  return (
    <>
      <View className="bg-white px-5 py-1 rounded-t-lg">
        <Text className="w-24 text-center font-mono font-bold text-3xl">
          Set {state.currentSet + 1}
        </Text>
      </View>
      <View className="flex-row w-48 h-20 bg-white rounded-lg self-center">
        <Text className="flex-1 text-center align-middle text-7xl leading-[1.2] font-mono font-bold text-cyan-500">
          {state.p1SetScore}
        </Text>
        <Text className="flex-1 text-center align-middle text-7xl leading-[1.2] font-mono font-bold text-rose-500">
          {state.p2SetScore}
        </Text>
      </View>
    </>
  );
};
