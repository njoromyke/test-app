import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "@/utils/theme/theme";
import { StatusBar } from "expo-status-bar";
import { getData } from "@/utils/storage";
import { config } from "@/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type User = {
  phoneNumber: string;
  id: string;
  token: string;
  expirationTime: string;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchUserData = async () => {
    const userData = await getData(config.SESSION_KEY);

    if (userData) {
      setUser(userData);
    }
  };

  const checkTokenExpiration = () => {
    if (user) {
      const expirationTime = new Date(user.expirationTime);
      const currentTime = new Date();

      if (currentTime > expirationTime) {
        setTokenExpired(true);
        router.replace("lock-screen");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    checkTokenExpiration();
  }, [user?.expirationTime]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
