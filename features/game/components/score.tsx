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
  longPress,
  nameTap,
}: {
  className?: string;
  playerName: string;
  score?: number;
  add?: (...args: any) => any;
  subtract?: (...args: any) => any;
  longPress?: (...args: any) => any;
  nameTap?: (...args: any) => any;
}) => {
  const gestures = Gesture.Exclusive(
    Gesture.LongPress()
      .minDuration(1000)
      .onStart((e) => {
        if (longPress) {
          runOnJS(longPress)(e);
        }
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

  const gestureInner = Gesture.Tap().onStart((e) => {
    if (nameTap) {
      runOnJS(nameTap)(e);
    }
  });

  return (
    <GestureDetector gesture={gestures}>
      <View className={`justify-center items-center ${className}`}>
        <GestureDetector gesture={gestureInner}>
          <Text
            className="max-h-20 text-[6rem] w-11/12 text-white font-mono font-bold text-center active:"
            minimumFontScale={0.5}
            adjustsFontSizeToFit
          >
            {playerName}
          </Text>
        </GestureDetector>
        <Text
          className="h-96 text-[25rem] w-11/12 text-white font-mono font-bold text-center"
          minimumFontScale={0.5}
          adjustsFontSizeToFit
        >
          {score}
        </Text>
      </View>
    </GestureDetector>
  );
};
