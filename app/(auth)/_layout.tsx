import Loader from "@/components/loader/loader";
import { config } from "@/config";
import { UserData } from "@/context/types/IdentityType";
import { getData } from "@/utils/storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

export default function HomeLayout() {
  const theme = useTheme();
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    const userData = await getData(config.SESSION_KEY);
    if (userData) {
      setUser(userData);
      setLoading(false);
    }

    setLoading(false);
  };

  const checkTokenExpiration = async () => {
    //       await storeData(config.START_TIME, new Date().getTime());
    const startTime = await getData(config.START_TIME);

    if (startTime && user?.expiresIn) {
      const currentTime = new Date().getTime();
      const expiryTime = startTime + parseInt(user.expiresIn);
      if (currentTime > expiryTime - 10000) {
        setTokenExpired(true);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.user?.id && !loading) {
      router.replace("(tabs)");
    }
  }, [user?.user?.id, loading]);

  useEffect(() => {
    checkTokenExpiration();
  }, [user?.expiresIn]);

  useEffect(() => {
    if (tokenExpired) {
      router.replace("lock-screen");
    }
  }, [tokenExpired]);

  console.log(user, "user")

  return loading ? (
    <Loader />
  ) : (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="phone-number/[phoneNumber]" options={{ headerShown: false }} />
    </Stack>
  );
}
