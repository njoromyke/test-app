import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { postData } from "@/axios";
import { storeData } from "@/utils/storage";
import { config } from "@/config";
import Loader from "@/components/loader/loader";

type Password = {
  password: string;
};

const PhoneNumber = () => {
  const theme = useTheme();
  const router = useRouter();
  const [userData, setUserData] = useState<Password>({
    password: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const { phoneNumber } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onNavigateBack = () => {
    router.back();
  };

  const handleRegister = async () => {
    if (!userData.password) {
      setMessage("Please enter a password to continue.");
      toggleSnack();
      return;
    }

    setLoading(true);
    const { success, error, data } = await postData("/auth/signUp", {
      phoneNumber,
      password: userData.password,
    });

    if (error) {
      console.log(error);
      setMessage(error);
      toggleSnack();
    } else if (success) {
      await storeData(config.SESSION_KEY, data?.data);
      await storeData(config.START_TIME, new Date().getTime());
      setMessage("Registration successful");
      router.push("(tabs)");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={onNavigateBack} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ flex: 1 }}>
          {loading && <Loader />}
          <Text variant="headlineLarge">User registration</Text>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 14,
              marginBottom: 14,
            }}
          >
            Enter password for: {phoneNumber}
          </Text>
          <View style={{ marginTop: 24, flex: 1, gap: 35 }}>
            <TextInput
              mode="outlined"
              value={userData.password || ""}
              label="Password"
              onChangeText={(value) => {
                setUserData({ password: value });
              }}
              secureTextEntry={!isPasswordVisible}
              right={<TextInput.Icon icon={isPasswordVisible ? "eye-off" : "eye"} onPress={togglePassword} />}
            />
            <Button mode="contained" onPress={handleRegister}>
              Submit
            </Button>
            <Button
              onPress={() => {
                router.push("login");
              }}
              disabled={loading}
            >
              Have an Account ? Please login
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

export default PhoneNumber;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});
