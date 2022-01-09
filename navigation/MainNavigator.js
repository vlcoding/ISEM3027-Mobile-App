import React, { useReducer, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNavigator from "./HomeNavigator";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  const initialLoadingState = {
    isLoading: false,
    userToken: "I have a token here",
    username: null,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {initialLoadingState.isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : initialLoadingState.userToken == null ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
