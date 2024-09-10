import { cssInterop } from "nativewind";
import { TextInput as TI } from "react-native";
import Animated from "react-native-reanimated";

export const Text = cssInterop(Animated.Text, {
  className: { target: "style" },
});

export const TextInput = Animated.createAnimatedComponent(TI);
