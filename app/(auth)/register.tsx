import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");

  const toggleSnack = () => {
    setShowSnack(!showSnack);
  };

  const onNavigateBack = () => {
    router.back();
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
            Enter phone number.
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
            <Link
              asChild
              href={{
                pathname: "phone-number/[phoneNumber]",
                params: { phoneNumber: userData.phoneNumber },
              }}
              disabled={!userData.phoneNumber}
            >
              <Button mode="contained">Continue</Button>
            </Link>
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
