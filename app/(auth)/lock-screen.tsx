import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { getData, storeData } from "@/utils/storage";
import { config } from "@/config";
import { useRouter } from "expo-router";
import { postData } from "@/axios";

type UserData = {
  phoneNumber: string;
  token: string;
  password: string;
};

const lockScreen = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState<UserData>({
    phoneNumber: "",
    token: "",
    password: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showSnack, setShowSnack] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const getUserData = async () => {
    const data = await getData(config.SESSION_KEY);

    if (data) {
      setUserData(data);
    }
  };

  const onLogin = async () => {
    if (!userData.password || !userData.phoneNumber) {
      return;
    }

    const url = "/auth/login";

    const { success, data, error } = await postData(url, userData);

    if (error) {
      setMessage(error);
      toggleSnack();
      return;
    }

    if (success) {
      await storeData(config.SESSION_KEY, data);
      router.replace("home");
    }
  };

  console.log(userData);

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flex: 1 }}>
          <Text variant="headlineLarge">Screen locked</Text>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 12,
            }}
          >
            Welcome back.
          </Text>

          <View style={{ marginTop: 24, flex: 1, gap: 30 }}>
            <Text variant="titleMedium">Your is Number: {userData.phoneNumber}</Text>
            <TextInput
              mode="outlined"
              value={userData.password || ""}
              label="Password"
              onChangeText={(value) => {
                setUserData({ ...userData, password: value });
              }}
              secureTextEntry={!isPasswordVisible}
              right={<TextInput.Icon icon={isPasswordVisible ? "eye-off" : "eye"} onPress={togglePassword} />}
            />

            <Button mode="contained" onPress={onLogin}>
              Login
            </Button>
            <Button
              onPress={() => {
                router.push("register");
              }}
            >
              Don't have an Account ? Please register
            </Button>
          </View>
        </View>
        {showSnack && (
          <Snackbar
            visible
            onDismiss={toggleSnack}
            action={{
              label: "Close",
              onPress: toggleSnack,
            }}
          >
            {message}
          </Snackbar>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default lockScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});
