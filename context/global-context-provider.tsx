import { useEffect, useMemo, useState } from "react";
import { GlobalContext } from "./global-context";
import { postData } from "@/axios";
import { getData } from "@/utils/storage";
import { config } from "@/config";

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

  const fetchUserData = async () => {
    console.log("fetchUserData");
    const userData = await getData(config.SESSION_KEY);
    console.log(userData, "userData");
    if (userData) {
      setUser(userData);
    }
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

  console.log(user);

  const values = useMemo(() => {
    return {
      user,
      theme,
      logout: logOut,
      toggleTheme,
      onThemeChange: toggleTheme,
    };
  }, [user?.user?.id]);

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
