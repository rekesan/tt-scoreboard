export { useColorScheme } from "react-native";
import { useColorScheme as NATIVE_userColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export function useColorSchemeGlobal() {
  const [loaded, setLoaded] = useState(false);
  const { setColorScheme } = NATIVE_userColorScheme();

  useEffect(() => {
    AsyncStorage.getItem("color-scheme")
      .then((scheme) => {
        switch (scheme) {
          case "light":
          case "dark":
          case "system": {
            setColorScheme(scheme || "system");
          }
        }
      })
      .catch(() => {
        Alert.alert("Error", "Failed to load prefered color scheme");
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return loaded;
}
