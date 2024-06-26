import { useMemo, useState } from "react";
import { GlobalContext } from "./global-context";
import { postData } from "@/axios";

type Props = {
  children: React.ReactNode;
};

type UserLogin = {
  phoneNumber: string;
  password: string;
};

export function GlobalContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>("light");

  const logOut = () => {
    console.log("logout");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "light" : "dark");
  };

  const user = {
    name: "John Doe",
    age: 30,
    id: "1",
    phoneNumber: "1234567890",
  };

  const values = useMemo(() => {
    return {
      user,
      theme,
      logout: logOut,
      toggleTheme,
      onThemeChange: toggleTheme,
    };
  }, [user?.id]);

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
