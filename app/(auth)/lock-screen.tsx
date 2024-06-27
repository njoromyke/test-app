import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { getData, storeData } from "@/utils/storage";
import { config } from "@/config";
import { useRouter } from "expo-router";
import { postData } from "@/axios";
import { UserData } from "@/context/types/IdentityType";
import Loader from "@/components/loader/loader";
const lockScreen = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showSnack, setShowSnack] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const getUserData = async () => {
    const data = await getData(config.SESSION_KEY);

    if (data) {
      setUserData(data);
    }
  };

  console.log(userData);

  const onLogin = async () => {
    if (!password || !userData?.user?.phoneNumber) {
      return;
    }

    setLoading(true);
    const url = "/auth/login";

    const { success, data, error } = await postData(url, {
      phoneNumber: userData?.user?.phoneNumber,
      password,
    });

    if (error) {
      setMessage(error);
      toggleSnack();
    } else if (success) {
      setMessage("Login successful");
      await storeData(config.SESSION_KEY, data);
      await storeData(config.START_TIME, new Date().getTime());
      router.replace("(tabs)");
    }

    setLoading(false);
  };

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
          {loading && <Loader />}
          <View style={{ marginTop: 24, flex: 1, gap: 30 }}>
            <Text variant="titleMedium">Your phone number is Number: {userData?.user?.phoneNumber}</Text>
            <TextInput
              mode="outlined"
              value={password || ""}
              label="Password"
              onChangeText={(value) => {
                setPassword(value);
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
