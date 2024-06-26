import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#9155FD",
    secondary: "#8A8D93",
    background: "#F4F5FA",
    card: "#ffffff",
    tabBackground: "#F0F2F8",
    onPrimary: "#FFFFFF",
    onSecondary: "#ffffff",
    success: "#00C851",
    onSuccess: "#ffffff",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 5,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#9E69FD",
    secondary: "#777B82",
    success: "#00C851",
    onSuccess: "#ffffff",
  },
};


