import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function HomeLayout() {
  const theme = useTheme();

  return (
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
