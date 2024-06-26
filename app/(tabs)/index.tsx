import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Image
        source={require("../../assets/images/home.png")}
        style={{
          width: "100%",
          flex: 0.5,
        }}
        blurRadius={0.5}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
        <Text variant="headlineLarge">Welcome to the test app</Text>
        <Text variant="titleMedium" style={{ marginTop: 12 }}>
          The test is is a demo on how to login and register using Nest JS
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
