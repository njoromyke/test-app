import { postData } from "@/axios";
import { config } from "@/config";
import { storeData } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Login = {
  phoneNumber: string;
  password: string;
};

const Login = () => {
  const theme = useTheme();
  const router = useRouter();
  const [userData, setUserData] = useState<Login>({
    password: "",
    phoneNumber: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnack, setShowSnack] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  const onNavigateBack = () => {
    router.back();
  };

  const onLogin = async () => {
    if (!userData.password || !userData.phoneNumber) {
      setMessage("Please all the fields");
      toggleSnack();
      return;
    }

    const { success, error, data } = await postData("/auth/login", userData);

    if (error) {
      setMessage(error);
      toggleSnack();
      return;
    }

    if (success) {
      await storeData(config.SESSION_KEY, data?.data);
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
          <Text variant="headlineLarge">Login</Text>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 12,
            }}
          >
            Welcome back.
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

export default Login;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});
