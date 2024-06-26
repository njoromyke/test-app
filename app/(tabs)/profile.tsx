import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UserData } from "@/context/types/IdentityType";
import { config } from "@/config";
import { getData, removeData } from "@/utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card, useTheme, Text, List } from "react-native-paper";
import { useRouter } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const theme = useTheme();
  const router = useRouter();

  const fetchUserData = async () => {
    console.log("fetchUserData");
    const userData = await getData(config.SESSION_KEY);

    if (userData) {
      setUser(userData);
    }
  };

  const onLogout = async () => {
    await removeData(config.SESSION_KEY);
    await removeData(config.START_TIME);
    setUser(null);
    router.replace("(auth)");
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => onLogout(),
      },
    ]);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 10,
      }}
    >
      <Card
        style={{
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Card.Content
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Avatar.Icon
            size={100}
            style={{
              backgroundColor: theme.colors.primary,
            }}
            icon="account"
          />
          <Card.Content>
            <Text variant="titleLarge">Phone Number:</Text>
            <Text variant="titleMedium">{user?.user?.phoneNumber}</Text>
          </Card.Content>
        </Card.Content>
      </Card>

      <List.Item
        title="Logout"
        onPress={() => {
          logout();
        }}
        right={(props) => <List.Icon {...props} icon="logout" />}
      />
    </SafeAreaView>
  );
};

export default Profile;
