import { useCallback, useEffect, useRef } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { cssInterop } from "nativewind";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { Text } from "@/components/AnimatedText";
import {
  elapsedSeconds,
  formattedElapsedTime,
  isPlayingAtom,
} from "./elapsed.atoms";

const FA6Icon = cssInterop(FontAwesome6, { className: { target: "style" } });

export const ElapsedTime = () => {
  const [play, setPlay] = useAtom(isPlayingAtom);
  const setSeconds = useSetAtom(elapsedSeconds);
  const elapsedTime = useAtomValue(formattedElapsedTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (play) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [play]);

  const toggle = useCallback(() => {
    setPlay((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setPlay(false);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return (
    <View className="bg-white pt-safe self-center rounded-b-md">
      <View className="w-80 p-2 flex-row justify-between items-center">
        <Pressable
          onPress={toggle}
          className="h-10 w-10 flex items-center justify-center transition-transform active:scale-90"
        >
          <FA6Icon
            name={play ? "pause" : "play"}
            className="text-gray-800"
            size={20}
          />
        </Pressable>
        <Text className="flex-1 text-center font-mono font-medium text-3xl">
          {elapsedTime}
        </Text>
        <Pressable
          onPress={reset}
          className="h-10 w-10 flex items-center justify-center transition-transform active:scale-90"
        >
          <FA6Icon
            name="arrow-rotate-left"
            className="text-gray-800"
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
};
