import Loader from "@/components/loader/loader";
import { GlobalContext } from "@/context";
import { Stack } from "expo-router";
import { useContext } from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const theme = useTheme();
  const { loading, user } = useContext(GlobalContext);

  return loading && !user?.access_token ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Loader />
    </SafeAreaView>
  ) : (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="phone-number/[phoneNumber]" options={{ headerShown: false }} />
    </Stack>
  );
}
