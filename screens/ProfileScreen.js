import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../navigation/context";

export default function ProfileScreen({ navigation }) {
  const [userToken, setUserToken] = useState("");
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome to your profile</Text>
      <Text>{userToken}</Text>
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
