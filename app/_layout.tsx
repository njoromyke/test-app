import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { config } from "@/config";
import { UserData } from "@/context/types/IdentityType";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getData } from "@/utils/storage";
import { darkTheme, lightTheme } from "@/utils/theme/theme";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme = useTheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Slot />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
