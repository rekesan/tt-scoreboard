import { View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { Text } from "@/components/AnimatedText";

export const Score = ({
  playerName,
  score = 0,
  className,
  add,
  subtract,
}: {
  className?: string;
  playerName: string;
  score?: number;
  add?: (...args: any) => any;
  subtract?: (...args: any) => any;
}) => {
  const gestures = Gesture.Exclusive(
    Gesture.LongPress()
      .minDuration(1000)
      .onStart((e) => {
        console.log("long press");
      }),
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd((e) => {
        if (subtract) {
          runOnJS(subtract)(e);
        }
        console.log("swipe");
      }),
    Gesture.Tap().onStart((e) => {
      if (add) {
        runOnJS(add)(e);
      }
      console.log("tap");
    })
  );

  return (
    <GestureDetector gesture={gestures}>
      <View className={`justify-center items-center ${className}`}>
        <Text className="text-5xl text-white font-mono font-bold text-center">
          {playerName}
        </Text>
        <Text className="text-[18rem] text-white font-mono font-bold">
          {score}
        </Text>
      </View>
    </GestureDetector>
  );
};
