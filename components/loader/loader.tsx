import * as React from "react";
import { ActivityIndicator, MD2Colors, useTheme } from "react-native-paper";

const Loader = () => {
  const theme = useTheme();

  return <ActivityIndicator animating={true} color={theme.colors.primary} />;
};

export default Loader;
