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
import { getData, removeData } from "@/utils/storage";
import { config } from "@/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type User = {
  phoneNumber: string;
  id: string;
  access_token: string;
  expiresIn: string;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [tokenExpired, setTokenExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const userData = await getData(config.SESSION_KEY);
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  };

  const checkTokenExpiration = () => {
    if (user) {
      const expirationTime = new Date(user.expiresIn);
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime.getTime()) {
        setTokenExpired(true);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    checkTokenExpiration();
  }, [user?.expiresIn]);

  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) {
    return null;
  }

  console.log(user?.access_token);

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
      <PaperProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
