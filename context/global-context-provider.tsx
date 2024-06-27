import { config } from "@/config";
import { getData } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { GlobalContext } from "./global-context";

type Props = {
  children: React.ReactNode;
};

type User = {
  phoneNumber: string;
  id: string;
};
type UserData = {
  access_token: string;
  expiresIn: string;
  user: User;
};

export function GlobalContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>("light");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const userData = await getData(config.SESSION_KEY);
    if (userData) {
      setUser(userData);
    }
  };
  const checkTokenExpiration = async () => {
    setLoading(true);
    const startTime = await getData(config.START_TIME);

    if (startTime && user?.expiresIn) {
      const currentTime = new Date().getTime();
      const expiryTime = parseInt(startTime) + parseInt(user.expiresIn) * 1000;
      if (currentTime > expiryTime) {
        setTokenExpired(true);
      } else {
        setTokenExpired(false);
      }
    }

    setLoading(false);
  };

  const logOut = () => {
    console.log("logout");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "light" : "dark");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (tokenExpired) {
      router.replace("lock-screen");
    }
  }, [tokenExpired]);

  useEffect(() => {
    if (user?.expiresIn && !loading) {
      checkTokenExpiration();
    }
  }, [user?.expiresIn, loading]);

  useEffect(() => {
    if (user?.access_token) {
      router.replace("(tabs)");
    }
  }, [user?.access_token]);

  const values = useMemo(() => {
    return {
      user,
      theme,
      logout: logOut,
      toggleTheme,
      onThemeChange: toggleTheme,
      loading,
      tokenExpired,
    };
  }, [user?.user?.id]);

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
