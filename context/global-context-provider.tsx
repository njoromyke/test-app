import { useMemo, useState } from "react";
import { GlobalContext } from "./global-context";

type Props = {
  children: React.ReactNode;
};

export function GlobalContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<string>("light");

  const logOut = () => {
    console.log("logout");
  };

  const login = () => {
    console.log("login");
  };

  const register = () => {};

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
      login,
      toggleTheme,
      register,
      onThemeChange: toggleTheme,
    };
  }, [user?.id]);

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
