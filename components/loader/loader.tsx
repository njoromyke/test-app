import * as React from "react";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";

type LoaderProps = {
  size?: number | "small" | "large" | undefined;
};

const Loader = ({ size = "small" }: LoaderProps) => {
  const theme = useTheme();

  return <ActivityIndicator animating={true} color={theme.colors.primary} size={size} />;
};

export default Loader;
