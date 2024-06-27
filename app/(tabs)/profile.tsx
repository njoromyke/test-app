import { config } from "@/config";
import { GlobalContext } from "@/context";
import { removeData } from "@/utils/storage";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Alert } from "react-native";
import { Avatar, Card, List, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useContext(GlobalContext);

  const onLogout = async () => {
    await removeData(config.SESSION_KEY);
    await removeData(config.START_TIME);
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
