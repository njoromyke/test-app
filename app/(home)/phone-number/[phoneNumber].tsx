import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { postData } from "@/axios";
import { storeData } from "@/utils/storage";
import { config } from "@/config";

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

    const { success, error, data } = await postData("/auth/signup", {
      phoneNumber,
      password: userData.password,
    });

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
              value={userData?.password || ""}
              onChangeText={(text) =>
                setUserData({
                  password: text,
                })
              }
            />
            <Button mode="contained" onPress={handleRegister}>
              Submit
            </Button>
            <Button
              onPress={() => {
                router.push("login");
              }}
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
