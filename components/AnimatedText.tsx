import { ComponentProps } from "react";
import { TextInput as TI } from "react-native";
import Animated from "react-native-reanimated";

export const Text = (props: ComponentProps<Animated.Text>) => {
  return <Animated.Text {...props} />;
};

export const TextInput = Animated.createAnimatedComponent(TI);
