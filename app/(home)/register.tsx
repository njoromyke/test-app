import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

type Register = {
  phoneNumber: string;
  password: string;
};

const Register = () => {
  const theme = useTheme();
  const router = useRouter();
  const [userData, setUserData] = useState<Register>({
    password: "",
    phoneNumber: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onNavigateBack = () => {
    router.back();
  };

  const handleRegister = () => {
    if (!userData.phoneNumber || !userData.password) {
      setMessage("Please fill all the fields");
      toggleSnack();
      return;
    }

    console.log("User Data:", userData);
    router.push("/");
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
          <Text variant="headlineLarge">Register</Text>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 12,
            }}
          >
            Create an account.
          </Text>

          <View style={{ marginTop: 24, flex: 1, gap: 30 }}>
            <TextInput
              mode="outlined"
              value={userData.phoneNumber || ""}
              label="Phone Number"
              onChangeText={(value) => {
                setUserData({ ...userData, phoneNumber: value });
              }}
            />
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

            <Button mode="contained" onPress={handleRegister}>
              Register
            </Button>
            <Button
              onPress={() => {
                router.push("login");
              }}
            >
              Have an Account ? Pleas login
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

export default Register;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});
