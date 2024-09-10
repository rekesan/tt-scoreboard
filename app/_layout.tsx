import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useSafeAreaEnv } from "nativewind";
import { useColorSchemeGlobal } from "@/hooks/useColorScheme";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isLoaded = useColorSchemeGlobal();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaEnv>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaEnv>
    </GestureHandlerRootView>
  );
}

function SafeAreaEnv({ children }: any) {
  // Add the safe area insets to the render tree
  return <View style={[{ flex: 1 }, useSafeAreaEnv()]}>{children}</View>;
}
