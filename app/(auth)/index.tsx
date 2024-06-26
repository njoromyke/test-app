import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Text, useTheme, Button } from "react-native-paper";
import { useRouter } from "expo-router";

const Index = () => {
  const theme = useTheme();
  const router = useRouter();

  const onClickRegisterButton = () => {
    router.push("/register");
  };

  const onClickLoginButton = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Image
        style={styles.image}
        source={require("../../assets/images/welcome.png")}
        transition={1000}
        contentFit="cover"
        blurRadius={0.5}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centeredView}>
          <Text style={styles.headlineText} variant="headlineMedium">
            Welcome to the test app
          </Text>
          <Text style={styles.titleText} variant="titleMedium">
            The test is is a demo on how to login and register using Nest JS
          </Text>
          <Button mode="contained" style={styles.button} onPress={onClickLoginButton}>
            Login
          </Button>
          <Button style={styles.button} onPress={onClickRegisterButton}>
            Register
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    flex: 0.9,
    borderRadius: 12,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  headlineText: {
    marginTop: 24,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  titleText: {
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 24,
    width: "100%",
  },
});
